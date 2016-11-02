package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Caseupdate;
import com.dorsal.domain.Supportcase;
import com.dorsal.repository.CaseupdateRepository;
import com.dorsal.repository.SupportcaseRepository;
import com.dorsal.repository.UserRepository;
import com.dorsal.service.emailNotificationUtility;
import com.dorsal.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Caseupdate.
 */
@RestController
@RequestMapping("/api")
public class CaseupdateResource {

    private final Logger log = LoggerFactory.getLogger(CaseupdateResource.class);

    @Inject
    private CaseupdateRepository caseupdateRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    @Inject
    private SupportcaseRepository supportcaseRepository;

    @Inject
    private emailNotificationUtility notificationService;


    /**
     * POST  /caseupdates : Create a new caseupdate.
     *
     * @param caseupdate the caseupdate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new caseupdate, or with status 400 (Bad Request) if the caseupdate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/caseupdates",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Caseupdate> createCaseupdate(@Valid @RequestBody Caseupdate caseupdate) throws URISyntaxException {
        log.debug("REST request to save Caseupdate : {}", caseupdate);
        if (caseupdate.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("caseupdate", "idexists", "A new caseupdate cannot already have an ID")).body(null);
        }
        // Get the current logged in user to be used as the case creator
        caseupdate.setUser(userRepository.findLoggedInUser());

        // Adjust time
        caseupdate.setDateUpdated(ZonedDateTime.now());
        long supportCaseID = caseupdate.getSupportcase().getId();

        try {
            //Supportcase supportcase = supportcaseRepository.findOne(supportCaseID);
            Supportcase supportcase = caseupdate.getSupportcase();
            if (supportcase != null ) {
                /* Increment counter for support case updates */
                int updates = supportcase.getNumberOfUpdates();
                supportcase.setNumberOfUpdates(++updates);
                /* persists */
                supportcaseRepository.save(supportcase);
            }
        } catch (Exception e) {
            log.error("CaseUpdate entity. Could not update Number Of Updates in Supportcase. Reason " + e);
        }

        /**
         * Send email notifications to both expert and user
         * JIRA: DEB-383
         */

        /* Extract user that generated the update */
        StringBuffer updateOriginator = new StringBuffer(caseupdate.getUser().getFirstName());
        updateOriginator.append(" ").append(caseupdate.getUser().getLastName());
        if (updateOriginator.length() == 0)
            updateOriginator.append(caseupdate.getUser().getEmail());

        /* Email notification */
        notificationService.caseUpdateEmailNotification(caseupdate.getSupportcase(), updateOriginator.toString(), caseupdate.getUpdateMsg());

        /* Persist case update */
        Caseupdate result = caseupdateRepository.save(caseupdate);

        return ResponseEntity.created(new URI("/api/caseupdates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("caseupdate", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /caseupdates : Updates an existing caseupdate.
     *
     * @param caseupdate the caseupdate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated caseupdate,
     * or with status 400 (Bad Request) if the caseupdate is not valid,
     * or with status 500 (Internal Server Error) if the caseupdate couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/caseupdates",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Caseupdate> updateCaseupdate(@Valid @RequestBody Caseupdate caseupdate) throws URISyntaxException {
        log.debug("REST request to update Caseupdate : {}", caseupdate);
        if (caseupdate.getId() == null) {
            return createCaseupdate(caseupdate);
        }

        // Adjust time
        caseupdate.setDateUpdated(ZonedDateTime.now());

        Caseupdate result = caseupdateRepository.save(caseupdate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("caseupdate", caseupdate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /caseupdates : get all the caseupdates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of caseupdates in body
     */
    @RequestMapping(value = "/caseupdates",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Caseupdate> getAllCaseupdates() {
        log.debug("REST request to get all Caseupdates");
        List<Caseupdate> caseupdates = caseupdateRepository.findAll();
        return caseupdates;
    }

    /**
     * GET  /caseupdates/:id : get the "id" caseupdate.
     *
     * @param id the id of the caseupdate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the caseupdate, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/caseupdates/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Caseupdate> getCaseupdate(@PathVariable Long id) {
        log.debug("REST request to get Caseupdate : {}", id);
        Caseupdate caseupdate = caseupdateRepository.findOne(id);
        return Optional.ofNullable(caseupdate)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /caseupdates/:id : delete the "id" caseupdate.
     *
     * @param id the id of the caseupdate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/caseupdates/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCaseupdate(@PathVariable Long id) {
        log.debug("REST request to delete Caseupdate : {}", id);
        caseupdateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("caseupdate", id.toString())).build();
    }

}
