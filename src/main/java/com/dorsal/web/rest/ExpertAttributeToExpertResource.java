package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.ExpertAttributeToExpert;

import com.dorsal.domain.User;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.ExpertAttributeToExpertRepository;
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
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ExpertAttributeToExpert.
 */
@RestController
@RequestMapping("/api")
public class ExpertAttributeToExpertResource {

    private final Logger log = LoggerFactory.getLogger(ExpertAttributeToExpertResource.class);

    @Inject
    private ExpertAttributeToExpertRepository expertAttributeToExpertRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    // ExpertAccount repository functinality for finding expert
    @Inject
    private ExpertAccountRepository expertRepository;

    /**
     * POST  /expert-attribute-to-experts : Create a new expertAttributeToExpert.
     *
     * @param expertAttributeToExpert the expertAttributeToExpert to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expertAttributeToExpert, or with status 400 (Bad Request) if the expertAttributeToExpert has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-attribute-to-experts",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAttributeToExpert> createExpertAttributeToExpert(@RequestBody ExpertAttributeToExpert expertAttributeToExpert) throws URISyntaxException {
        log.debug("REST request to save ExpertAttributeToExpert : {}", expertAttributeToExpert);
        if (expertAttributeToExpert.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertAttributeToExpert", "idexists", "A new expertAttributeToExpert cannot already have an ID")).body(null);
        }

        // Get the current logged in user to be used as the case creator
        ExpertAccount expert = expertRepository.findExpertAccountForUser(userRepository.findLoggedInUser().getLogin());

        // Only experts can add entries
        if (expert == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertAttributeToExpert", "invaliduser", "ExpertAttributeToExpert entry can only be created by experts!")).body(null);
        }

        // Use the expert account as the owner of the record
        expertAttributeToExpert.setExpertaccount(expert);

        ExpertAttributeToExpert result = expertAttributeToExpertRepository.save(expertAttributeToExpert);
        return ResponseEntity.created(new URI("/api/expert-attribute-to-experts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("expertAttributeToExpert", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expert-attribute-to-experts : Updates an existing expertAttributeToExpert.
     *
     * @param expertAttributeToExpert the expertAttributeToExpert to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expertAttributeToExpert,
     * or with status 400 (Bad Request) if the expertAttributeToExpert is not valid,
     * or with status 500 (Internal Server Error) if the expertAttributeToExpert couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-attribute-to-experts",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAttributeToExpert> updateExpertAttributeToExpert(@RequestBody ExpertAttributeToExpert expertAttributeToExpert) throws URISyntaxException {
        log.debug("REST request to update ExpertAttributeToExpert : {}", expertAttributeToExpert);
        if (expertAttributeToExpert.getId() == null) {
            return createExpertAttributeToExpert(expertAttributeToExpert);
        }
        ExpertAttributeToExpert result = expertAttributeToExpertRepository.save(expertAttributeToExpert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("expertAttributeToExpert", expertAttributeToExpert.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expert-attribute-to-experts : get all the expertAttributeToExperts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertAttributeToExperts in body
     */
    @RequestMapping(value = "/expert-attribute-to-experts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertAttributeToExpert> getAllExpertAttributeToExperts() {
        log.debug("REST request to get all ExpertAttributeToExperts");
        List<ExpertAttributeToExpert> expertAttributeToExperts = expertAttributeToExpertRepository.findAll();
        return expertAttributeToExperts;
    }

    /**
     * GET  /expert-attribute-to-experts/:id : get the "id" expertAttributeToExpert.
     *
     * @param id the id of the expertAttributeToExpert to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expertAttributeToExpert, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/expert-attribute-to-experts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAttributeToExpert> getExpertAttributeToExpert(@PathVariable Long id) {
        log.debug("REST request to get ExpertAttributeToExpert : {}", id);
        ExpertAttributeToExpert expertAttributeToExpert = expertAttributeToExpertRepository.findOne(id);
        return Optional.ofNullable(expertAttributeToExpert)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /expert-attribute-to-experts/:id : delete the "id" expertAttributeToExpert.
     *
     * @param id the id of the expertAttributeToExpert to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/expert-attribute-to-experts/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteExpertAttributeToExpert(@PathVariable Long id) {
        log.debug("REST request to delete ExpertAttributeToExpert : {}", id);
        expertAttributeToExpertRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("expertAttributeToExpert", id.toString())).build();
    }

}
