package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Supportcase;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.SupportcaseRepository;
import com.dorsal.repository.UserRepository;
import com.dorsal.repository.UserRepository;
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
    @Timed
    public ResponseEntity<Supportcase> createSupportcase(@Valid @RequestBody Supportcase supportcase) throws URISyntaxException {
        log.debug("REST request to save Supportcase : {}", supportcase);
        if (supportcase.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("supportcase", "idexists", "A new supportcase cannot already have an ID")).body(null);
        }
        // Get the current logged in user to be used as the case creator
        supportcase.setUser(userRepository.findLoggedInUser());

        // Update the date fields
        supportcase.setDateCreated( ZonedDateTime.now() );
        supportcase.setDateLastUpdate( ZonedDateTime.now() );

        //
        // Set the Expert for this account
        // This is the placeholder for the matching algorithm
        //
        List expertList = expertAccountRepository.findOneByFirstTechnologyPreference(supportcase.getTechnology().getName());
        if (expertList.size() > 0) {
            log.info("Expert Found for Technology [" + supportcase.getTechnology().getName() + "]");
            supportcase.setExpertaccount((ExpertAccount)expertList.get(0));
        }
        else
        {
            // No match found -- need to address it to a concierge
            log.info("No expert available to work on the case. We keep searching...");
        }

        Supportcase result = supportcaseRepository.save(supportcase);
        return ResponseEntity.created(new URI("/api/supportcases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("supportcase", result.getId().toString()))
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
        supportcase.setDateLastUpdate( ZonedDateTime.now() );

        Supportcase result = supportcaseRepository.save(supportcase);
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
    public List<Supportcase> getAllSupportcases() {
        log.debug("REST request to get all Supportcases");
        int numCases = 0;
        // Get support cases by currently logged in user
        List<Supportcase> supportcases = supportcaseRepository.findByUserIsCurrentUser(); //.findAll();
        numCases = supportcases.size();
        log.info("Support cases owned by user " + numCases);

        // Get support cases for where currently logged in user is expert
        supportcases.addAll(supportcaseRepository.findByExpertIsCurrentUser());
        log.info("Support cases user is expert " + (supportcases.size() - numCases) );
        numCases = supportcases.size();

        // Get support cases tat are shared to user
        supportcases.addAll(supportcaseRepository.findBySharedIsCurrentUser());
        log.info("Support cases shared to user " + (supportcases.size() - numCases) );
        numCases = supportcases.size();


        // Return the combined list
        return supportcases;
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
