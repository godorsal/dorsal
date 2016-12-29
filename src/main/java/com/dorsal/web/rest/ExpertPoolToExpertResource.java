package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertPoolToExpert;

import com.dorsal.repository.ExpertPoolToExpertRepository;
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
 * REST controller for managing ExpertPoolToExpert.
 */
@RestController
@RequestMapping("/api")
public class ExpertPoolToExpertResource {

    private final Logger log = LoggerFactory.getLogger(ExpertPoolToExpertResource.class);
        
    @Inject
    private ExpertPoolToExpertRepository expertPoolToExpertRepository;

    /**
     * POST  /expert-pool-to-experts : Create a new expertPoolToExpert.
     *
     * @param expertPoolToExpert the expertPoolToExpert to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expertPoolToExpert, or with status 400 (Bad Request) if the expertPoolToExpert has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-pool-to-experts",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertPoolToExpert> createExpertPoolToExpert(@RequestBody ExpertPoolToExpert expertPoolToExpert) throws URISyntaxException {
        log.debug("REST request to save ExpertPoolToExpert : {}", expertPoolToExpert);
        if (expertPoolToExpert.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertPoolToExpert", "idexists", "A new expertPoolToExpert cannot already have an ID")).body(null);
        }
        ExpertPoolToExpert result = expertPoolToExpertRepository.save(expertPoolToExpert);
        return ResponseEntity.created(new URI("/api/expert-pool-to-experts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("expertPoolToExpert", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expert-pool-to-experts : Updates an existing expertPoolToExpert.
     *
     * @param expertPoolToExpert the expertPoolToExpert to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expertPoolToExpert,
     * or with status 400 (Bad Request) if the expertPoolToExpert is not valid,
     * or with status 500 (Internal Server Error) if the expertPoolToExpert couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-pool-to-experts",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertPoolToExpert> updateExpertPoolToExpert(@RequestBody ExpertPoolToExpert expertPoolToExpert) throws URISyntaxException {
        log.debug("REST request to update ExpertPoolToExpert : {}", expertPoolToExpert);
        if (expertPoolToExpert.getId() == null) {
            return createExpertPoolToExpert(expertPoolToExpert);
        }
        ExpertPoolToExpert result = expertPoolToExpertRepository.save(expertPoolToExpert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("expertPoolToExpert", expertPoolToExpert.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expert-pool-to-experts : get all the expertPoolToExperts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertPoolToExperts in body
     */
    @RequestMapping(value = "/expert-pool-to-experts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertPoolToExpert> getAllExpertPoolToExperts() {
        log.debug("REST request to get all ExpertPoolToExperts");
        List<ExpertPoolToExpert> expertPoolToExperts = expertPoolToExpertRepository.findAll();
        return expertPoolToExperts;
    }

    /**
     * GET  /expert-pool-to-experts/:id : get the "id" expertPoolToExpert.
     *
     * @param id the id of the expertPoolToExpert to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expertPoolToExpert, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/expert-pool-to-experts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertPoolToExpert> getExpertPoolToExpert(@PathVariable Long id) {
        log.debug("REST request to get ExpertPoolToExpert : {}", id);
        ExpertPoolToExpert expertPoolToExpert = expertPoolToExpertRepository.findOne(id);
        return Optional.ofNullable(expertPoolToExpert)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /expert-pool-to-experts/:id : delete the "id" expertPoolToExpert.
     *
     * @param id the id of the expertPoolToExpert to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/expert-pool-to-experts/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteExpertPoolToExpert(@PathVariable Long id) {
        log.debug("REST request to delete ExpertPoolToExpert : {}", id);
        expertPoolToExpertRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("expertPoolToExpert", id.toString())).build();
    }

}
