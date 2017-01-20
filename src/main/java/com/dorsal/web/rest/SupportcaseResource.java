package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Status;
import com.dorsal.domain.Supportcase;
import com.dorsal.repository.*;
import com.dorsal.service.DorsalExpertMatchService;
import com.dorsal.service.emailNotificationUtility;
import com.dorsal.repository.UserRepository;
import com.dorsal.web.rest.util.HeaderUtil;
import com.dorsal.service.dto.SupportcaseDTO;
import com.dorsal.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * REST controller for managing Supportcase.
 */
@RestController
@RequestMapping("/api")
public class SupportcaseResource {

    private final Logger log = LoggerFactory.getLogger(SupportcaseResource.class);

    @Inject
    private SupportcaseRepository supportcaseRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    @Inject
    private ExpertAccountRepository expertAccountRepository;

    @Inject
    private emailNotificationUtility notificationService;

    @Inject
    private SupportCaseReportRepository supportCaseReportRepository;

    @Inject
    private RatingRepository ratingRepository;

    @Inject
    private DorsalExpertMatchService dorsalExpertMatchService;


    /**
     * POST  /supportcases : Create a new supportcase.
     *
     * @param supportcase the supportcase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supportcase, or with status 400 (Bad Request) if the supportcase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/supportcases",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    //@Timed
    public ResponseEntity<Supportcase> createSupportcase(@Valid @RequestBody Supportcase supportcase) throws URISyntaxException {
        log.debug("REST request to save Supportcase : {}", supportcase);
        if (supportcase.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("supportcase", "idexists", "A new supportcase cannot already have an ID")).body(null);
        }
        // Get the current logged in user to be used as the case creator
        supportcase.setUser(userRepository.findLoggedInUser());

        // Update the date fields
        supportcase.setDateCreated(ZonedDateTime.now());
        supportcase.setDateLastUpdate(ZonedDateTime.now());

        //
        // Set the Expert for this account
        // This is the placeholder for the matching algorithm
        //

        ExpertAccount expert = dorsalExpertMatchService.findExpertForSupportcase(supportcase);
        if (expert != null) {
            // Assign Expert to support case
            supportcase.setExpertaccount(expert);
            log.info("Expert [" + expert.getId() + "] assigned to support case: [" + supportcase.getSummary() + "]");
        }

        // Initialize other members
        supportcase.setIsRated(false);
        supportcase.setIsResolved(false);
        supportcase.setNumberOfUpdates(0);
        supportcase.setIsApproved(false);
        supportcase.setEstimateLog("");
        supportcase.setEstimateHours(0);
        supportcase.setEstimateComment("");

        Supportcase result = supportcaseRepository.save(supportcase);
        //Supportcase result = supportcaseRepository.saveAndFlush(supportcase);

        /*
            Notification -- moved to expert match routine
         */
        // notificationService.createSupportCaseNotifications(supportcase);

        return ResponseEntity.created(new URI("/api/supportcases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("supportcase", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supportcases/expertmatch : Updates an existing supportcase with perfect expert match.
     *
     * @param supportcase the supportcase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supportcase,
     * or with status 400 (Bad Request) if the supportcase is not valid,
     * or with status 500 (Internal Server Error) if the supportcase couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/supportcases/expertmatch",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Supportcase> updateSupportcaseWithExpertMatch(@Valid @RequestBody Supportcase supportcase) throws URISyntaxException {
        log.debug("REST request to update Supportcase with expert match : {}", supportcase);
        if (supportcase.getId() == null) {
            return createSupportcase(supportcase);
        }

        // Adjust time
        supportcase.setDateLastUpdate(ZonedDateTime.now());

        log.info("*********** v1.2 Expert lookup start **********");
        long startTime = System.currentTimeMillis();

        //result.setExpertaccount(dorsalExpertMatchService.findExpertByProfileMatch(result));
        supportcase.setExpertaccount( dorsalExpertMatchService.findExpertByProfileMatch(supportcase));

        log.info("Perfect match routine took " + (System.currentTimeMillis() - startTime) + " ms");
        log.info("*********** v1.2 Expert lookup end **********");

        // Persist update
        Supportcase result = supportcaseRepository.save(supportcase);

        /*
            Notification
         */
        notificationService.createSupportCaseNotifications(supportcase);


        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("supportcase", supportcase.getId().toString()))
            .body(result);
    }


    /**
     * PUT  /supportcases : Updates an existing supportcase.
     *
     * @param supportcase the supportcase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supportcase,
     * or with status 400 (Bad Request) if the supportcase is not valid,
     * or with status 500 (Internal Server Error) if the supportcase couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/supportcases",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Supportcase> updateSupportcase(@Valid @RequestBody Supportcase supportcase) throws URISyntaxException {
        log.debug("REST request to update Supportcase : {}", supportcase);
        if (supportcase.getId() == null) {
            return createSupportcase(supportcase);
        }
        // Adjust time
        supportcase.setDateLastUpdate(ZonedDateTime.now());

        /*
            Notifications of (re)-approval of estimate depends on state change and approval flag.
         */
        boolean isNotified = false;
        Supportcase currentCase = supportcaseRepository.findOne(supportcase.getId());

        /* If estimate hours changed trigger re-approval request */
        if (currentCase.getStatus().getName().equalsIgnoreCase("WORKING")
            && supportcase.getStatus().getName().equalsIgnoreCase("WORKING")
            && currentCase.getEstimateHours() != supportcase.getEstimateHours()) {
            supportcase.setIsApproved(false);
            log.info("Supportcase estimate changed. Request re-approval");
        }

        try {
            isNotified = notificationService.supportCaseReEstimateApproved(currentCase, supportcase);
                /* Check if estimate approval took place -- trigger increment of updates for the case */
            if (isNotified) {
                int updates = supportcase.getNumberOfUpdates();
                supportcase.setNumberOfUpdates(++updates);
                log.info("Incremented Number of updates for case: " + updates);
            }

        } catch (Exception e) {
            log.error("Case Estimate notification -- Failed to call notification service. Error " + e);
        }

        /*
            When a case is rated the support case needs to be marked as rated (supportcase.is_rated)
            The running average for the expert score needs to be adjusted as well

            In addition a new entry needs to be added to the SupportCaseReport
         */
        try {
            if ((supportcase.getStatus().getName().equalsIgnoreCase("CLOSED"))
                && (supportcase.isIsResolved())) {
                supportcase.setIsRated(true);
            }
        } catch (Exception e) {
            log.error("Failed to set support case to resolved. Error " + e);
        }

        // Persist update
        Supportcase result = supportcaseRepository.save(supportcase);

        /*
            Check for other type of Notifications
         */
        if (!isNotified) {
            try {
                if (!notificationService.stateChangeNotifications(supportcase)) {
                    log.info("No notification send out for support case update");
                } else {
                    // Updates might have incremented save
                    result = supportcaseRepository.save(supportcase);
                }

            } catch (Exception e) {
                log.error("State Change estimate -- Failed to call notification service. Error " + e);
            }
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("supportcase", supportcase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supportcases : get all the supportcases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supportcases in body
     */
    @RequestMapping(value = "/supportcases",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Supportcase>> getAllSupportcases(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get all Supportcases");
        int numCases = 0;

        /**
         * Admin user will get all support cases
         * TBD: Need pagination for this use case
         */

        log.info("Pagabale arguments Pagesize [" + pageable.getPageSize() + "] Offset [" + pageable.getOffset() + "]");
        Page<Supportcase> page = supportcaseRepository.findAllAdminIsCurrentUser(pageable);
        List<Supportcase> supportcasesList = page.getContent();

        //List<Supportcase> supportcasesList = supportcaseRepository.findAllAdminIsCurrentUser();
        if (supportcasesList.size() > 0) {
            log.info("Pages [" +page.getTotalPages() + "] Total Elements ADMIN [" + page.getTotalElements() +"]");
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases");
            return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);
            //return new ResponseEntity<>(supportcasesList, HttpStatus.OK);
        }

        // Get support cases for where currently logged in user is expert
        page = supportcaseRepository.findByExpertIsCurrentUser(pageable);
        supportcasesList = page.getContent();

        if (supportcasesList.size() > 0) {
            log.info("Pages [" +page.getTotalPages() + "] Total Elements EXPERT [" + page.getTotalElements() +"]");
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases");
            return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);
        }


        // Get support cases for where currently logged in user is owner
        page = supportcaseRepository.findByOwnerIsCurrentUser(pageable);
        supportcasesList = page.getContent();

        if (supportcasesList.size() > 0 ) {
            log.info("Pages [" +page.getTotalPages() + "] Total Elements OWNER[" + page.getTotalElements() +"]");
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases");
            return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);
        }

        // Get support cases for where currently logged in user has shared cases
        page = supportcaseRepository.findIsSharedwithCurrentUser(pageable);
        supportcasesList = page.getContent();

        int sharedCases = supportcaseRepository.getCountOfSharedCasesByUser();
        int groupAccess = supportcaseRepository.getCountOfGroupAccessbyUser();
        log.debug("Cases shared [" + sharedCases +"] Cases GroupAccess [" + groupAccess + "]");

        log.info("Total Elements SHARED[" + page.getTotalElements() + "]");

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases");
        log.debug("Header: " + headers.toString());

        return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);

        // Get support cases by currently logged in user
 //       supportcasesList.addAll(supportcaseRepository.findByUserIsCurrentUser());
//        log.debug("Support cases owned by user " + numCases);
//        numCases = supportcasesList.size();

        // Get support cases for where currently logged in user is expert
 //       supportcasesList.addAll(supportcaseRepository.findByExpertIsCurrentUser());
 //       log.debug("Support cases user is expert " + (supportcasesList.size() - numCases));
 //       numCases = supportcasesList.size();

        // Get support cases tat are shared to user
 //       supportcasesList.addAll(supportcaseRepository.findBySharedIsCurrentUser());
 //       log.debug("Support cases shared to user " + (supportcasesList.size() - numCases));
  //      numCases = supportcasesList.size();

        // Get all support cases for users that in the authorized group for the logged in user
   //     List<Supportcase> groupAuthorizedCases = supportcaseRepository.findGroupAccessUser();

        // For now add the list to the result
  //      supportcasesList.addAll(groupAuthorizedCases);
  //      log.debug("Support by authorized users by this user " + groupAuthorizedCases.size());

        // Return the combined list
  //      return new ResponseEntity<>(supportcasesList, HttpStatus.OK);
    }


    /**
     * GET  /supportcases/expert : get all the supportcases for the expert.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supportcases in body
     */
    @RequestMapping(value = "/supportcases/expert",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Supportcase>> getAllSupportcasesExpert(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get all Supportcases");

        // Get support cases for where currently logged in user is expert
        Page<Supportcase> page = supportcaseRepository.findByExpertIsCurrentUser(pageable);
        List<Supportcase> supportcasesList = page.getContent();

        log.debug("Support cases user is expert " + (supportcasesList.size()));

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases/expert");
        return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);
    }

    /**
     * GET  /supportcases/owner : get all the supportcases for the owner.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supportcases in body
     */
    @RequestMapping(value = "/supportcases/owner",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Supportcase>> getAllSupportcasesOwner(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get all Supportcases");

        /**
         * Check if logged-in user is admin which will return all cases
         *
         * If 0 cases are returned (no admin) return the cases that the current users owns
         */
        Page<Supportcase> page = supportcaseRepository.findAllAdminIsCurrentUser(pageable);
        List<Supportcase> supportcasesList = page.getContent();

        if (supportcasesList.size() == 0) {

            // Get support cases for where currently logged in user is owner
            page = supportcaseRepository.findByOwnerIsCurrentUser(pageable);
            supportcasesList = page.getContent();

            log.debug("Support cases user is owner " + (supportcasesList.size()));
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases/owner");
        return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);
    }

    /**
     * GET  /supportcases/shared : get all the supportcases that are shared with user.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supportcases in body
     */
    @RequestMapping(value = "/supportcases/shared",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Supportcase>> getAllSupportcasesShared(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get all Supportcases");

        // Get support cases for where currently logged in user is owner
        Page<Supportcase> page = supportcaseRepository.findIsSharedwithCurrentUser(pageable);
        List<Supportcase> supportcasesList = page.getContent();

        log.debug("Support cases shared with user " + (supportcasesList.size()));

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/supportcases/shared");
        return new ResponseEntity<>(supportcasesList, headers, HttpStatus.OK);
    }


    /**
     * GET  /supportcases/:id : get the "id" supportcase.
     *
     * @param id the id of the supportcase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supportcase, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/supportcases/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Supportcase> getSupportcase(@PathVariable Long id) {
        log.debug("REST request to get Supportcase : {}", id);
        Supportcase supportcase = supportcaseRepository.findOne(id);
        return Optional.ofNullable(supportcase)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /supportcases/:id : delete the "id" supportcase.
     *
     * @param id the id of the supportcase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/supportcases/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSupportcase(@PathVariable Long id) {
        log.debug("REST request to delete Supportcase : {}", id);
        supportcaseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("supportcase", id.toString())).build();
    }

}
