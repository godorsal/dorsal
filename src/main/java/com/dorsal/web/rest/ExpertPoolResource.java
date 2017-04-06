package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.ExpertPool;

import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.ExpertPoolRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ExpertPool.
 */
@RestController
@RequestMapping("/api")
public class ExpertPoolResource {

    private final Logger log = LoggerFactory.getLogger(ExpertPoolResource.class);

    @Inject
    private ExpertPoolRepository expertPoolRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    // ExpertAccount repository functinality for finding expert
    @Inject
    private ExpertAccountRepository expertRepository;

    /**
     * POST  /expert-pools : Create a new expertPool.
     *
     * @param expertPool the expertPool to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expertPool, or with status 400 (Bad Request) if the expertPool has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-pools",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertPool> createExpertPool(@Valid @RequestBody ExpertPool expertPool) throws URISyntaxException {
        log.debug("REST request to save ExpertPool : {}", expertPool);
        if (expertPool.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertPool", "idexists", "A new expertPool cannot already have an ID")).body(null);
        }

        // Get the current logged in user to be used as the case creator
        ExpertAccount expert = expertRepository.findExpertAccountForUser(userRepository.findLoggedInUser().getLogin());

        // Only experts can add entries
        if (expert == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertPool", "invaliduser", "expertPool entry can only be created by experts!")).body(null);
        }

        // Expert Pool Owner is current logged in user
        expertPool.setExpertpoolowner(expert);

        ExpertPool result = expertPoolRepository.save(expertPool);
        return ResponseEntity.created(new URI("/api/expert-pools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("expertPool", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expert-pools : Updates an existing expertPool.
     *
     * @param expertPool the expertPool to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expertPool,
     * or with status 400 (Bad Request) if the expertPool is not valid,
     * or with status 500 (Internal Server Error) if the expertPool couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-pools",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertPool> updateExpertPool(@Valid @RequestBody ExpertPool expertPool) throws URISyntaxException {
        log.debug("REST request to update ExpertPool : {}", expertPool);
        if (expertPool.getId() == null) {
            return createExpertPool(expertPool);
        }

        // Get the current logged in user, make sure is an expert and matches the expert on record
        ExpertAccount expert = expertRepository.findExpertAccountForUser(userRepository.findLoggedInUser().getLogin());

        if (   expert == null
            || expert.getId() != expertPool.getExpertpoolowner().getId() ) {
            // Only valid experts and records owner can update the record
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("ExpertPool", "invaliduser", "ExpertPool entry can only be updated by expert that has created the entry!")).body(null);
        }


        ExpertPool result = expertPoolRepository.save(expertPool);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("expertPool", expertPool.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expert-pools : get all the expertPools.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertPools in body
     */
    @RequestMapping(value = "/expert-pools",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertPool> getAllExpertPools() {
        log.debug("REST request to get all ExpertPools");
        List<ExpertPool> expertPools = expertPoolRepository.findByUserIsCurrentUser();
        return expertPools;
    }
    @RequestMapping(value = "/expert-pools/admin",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertPool> getAllExpertPoolsAdmin() {
        log.debug("REST request to get all ExpertPools");
        List<ExpertPool> expertPools = expertPoolRepository.findAllAdminIsCurrentUser();
        return expertPools;
    }

    /**
     * GET  /expert-pools/:id : get the "id" expertPool.
     *
     * @param id the id of the expertPool to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expertPool, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/expert-pools/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertPool> getExpertPool(@PathVariable Long id) {
        log.debug("REST request to get ExpertPool : {}", id);
        ExpertPool expertPool = expertPoolRepository.findOne(id);
        return Optional.ofNullable(expertPool)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /expert-pools/:id : delete the "id" expertPool.
     *
     * @param id the id of the expertPool to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/expert-pools/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteExpertPool(@PathVariable Long id) {
        log.debug("REST request to delete ExpertPool : {}", id);
        expertPoolRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("expertPool", id.toString())).build();
    }

}
