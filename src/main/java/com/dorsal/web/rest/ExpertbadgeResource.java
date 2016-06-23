package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Expertbadge;
import com.dorsal.repository.ExpertbadgeRepository;
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
 * REST controller for managing Expertbadge.
 */
@RestController
@RequestMapping("/api")
public class ExpertbadgeResource {

    private final Logger log = LoggerFactory.getLogger(ExpertbadgeResource.class);
        
    @Inject
    private ExpertbadgeRepository expertbadgeRepository;
    
    /**
     * POST  /expertbadges : Create a new expertbadge.
     *
     * @param expertbadge the expertbadge to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expertbadge, or with status 400 (Bad Request) if the expertbadge has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expertbadges",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Expertbadge> createExpertbadge(@RequestBody Expertbadge expertbadge) throws URISyntaxException {
        log.debug("REST request to save Expertbadge : {}", expertbadge);
        if (expertbadge.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertbadge", "idexists", "A new expertbadge cannot already have an ID")).body(null);
        }
        Expertbadge result = expertbadgeRepository.save(expertbadge);
        return ResponseEntity.created(new URI("/api/expertbadges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("expertbadge", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expertbadges : Updates an existing expertbadge.
     *
     * @param expertbadge the expertbadge to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expertbadge,
     * or with status 400 (Bad Request) if the expertbadge is not valid,
     * or with status 500 (Internal Server Error) if the expertbadge couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expertbadges",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Expertbadge> updateExpertbadge(@RequestBody Expertbadge expertbadge) throws URISyntaxException {
        log.debug("REST request to update Expertbadge : {}", expertbadge);
        if (expertbadge.getId() == null) {
            return createExpertbadge(expertbadge);
        }
        Expertbadge result = expertbadgeRepository.save(expertbadge);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("expertbadge", expertbadge.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expertbadges : get all the expertbadges.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertbadges in body
     */
    @RequestMapping(value = "/expertbadges",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Expertbadge> getAllExpertbadges() {
        log.debug("REST request to get all Expertbadges");
        List<Expertbadge> expertbadges = expertbadgeRepository.findAll();
        return expertbadges;
    }

    /**
     * GET  /expertbadges/:id : get the "id" expertbadge.
     *
     * @param id the id of the expertbadge to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expertbadge, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/expertbadges/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Expertbadge> getExpertbadge(@PathVariable Long id) {
        log.debug("REST request to get Expertbadge : {}", id);
        Expertbadge expertbadge = expertbadgeRepository.findOne(id);
        return Optional.ofNullable(expertbadge)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /expertbadges/:id : delete the "id" expertbadge.
     *
     * @param id the id of the expertbadge to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/expertbadges/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteExpertbadge(@PathVariable Long id) {
        log.debug("REST request to delete Expertbadge : {}", id);
        expertbadgeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("expertbadge", id.toString())).build();
    }

}
