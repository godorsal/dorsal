package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.JobroleExpertScore;

import com.dorsal.repository.JobroleExpertScoreRepository;
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
 * REST controller for managing JobroleExpertScore.
 */
@RestController
@RequestMapping("/api")
public class JobroleExpertScoreResource {

    private final Logger log = LoggerFactory.getLogger(JobroleExpertScoreResource.class);
        
    @Inject
    private JobroleExpertScoreRepository jobroleExpertScoreRepository;

    /**
     * POST  /jobrole-expert-scores : Create a new jobroleExpertScore.
     *
     * @param jobroleExpertScore the jobroleExpertScore to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobroleExpertScore, or with status 400 (Bad Request) if the jobroleExpertScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/jobrole-expert-scores",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobroleExpertScore> createJobroleExpertScore(@RequestBody JobroleExpertScore jobroleExpertScore) throws URISyntaxException {
        log.debug("REST request to save JobroleExpertScore : {}", jobroleExpertScore);
        if (jobroleExpertScore.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("jobroleExpertScore", "idexists", "A new jobroleExpertScore cannot already have an ID")).body(null);
        }
        JobroleExpertScore result = jobroleExpertScoreRepository.save(jobroleExpertScore);
        return ResponseEntity.created(new URI("/api/jobrole-expert-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("jobroleExpertScore", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobrole-expert-scores : Updates an existing jobroleExpertScore.
     *
     * @param jobroleExpertScore the jobroleExpertScore to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobroleExpertScore,
     * or with status 400 (Bad Request) if the jobroleExpertScore is not valid,
     * or with status 500 (Internal Server Error) if the jobroleExpertScore couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/jobrole-expert-scores",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobroleExpertScore> updateJobroleExpertScore(@RequestBody JobroleExpertScore jobroleExpertScore) throws URISyntaxException {
        log.debug("REST request to update JobroleExpertScore : {}", jobroleExpertScore);
        if (jobroleExpertScore.getId() == null) {
            return createJobroleExpertScore(jobroleExpertScore);
        }
        JobroleExpertScore result = jobroleExpertScoreRepository.save(jobroleExpertScore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("jobroleExpertScore", jobroleExpertScore.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobrole-expert-scores : get all the jobroleExpertScores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobroleExpertScores in body
     */
    @RequestMapping(value = "/jobrole-expert-scores",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<JobroleExpertScore> getAllJobroleExpertScores() {
        log.debug("REST request to get all JobroleExpertScores");
        List<JobroleExpertScore> jobroleExpertScores = jobroleExpertScoreRepository.findAll();
        return jobroleExpertScores;
    }

    /**
     * GET  /jobrole-expert-scores/:id : get the "id" jobroleExpertScore.
     *
     * @param id the id of the jobroleExpertScore to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobroleExpertScore, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/jobrole-expert-scores/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobroleExpertScore> getJobroleExpertScore(@PathVariable Long id) {
        log.debug("REST request to get JobroleExpertScore : {}", id);
        JobroleExpertScore jobroleExpertScore = jobroleExpertScoreRepository.findOne(id);
        return Optional.ofNullable(jobroleExpertScore)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /jobrole-expert-scores/:id : delete the "id" jobroleExpertScore.
     *
     * @param id the id of the jobroleExpertScore to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/jobrole-expert-scores/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteJobroleExpertScore(@PathVariable Long id) {
        log.debug("REST request to delete JobroleExpertScore : {}", id);
        jobroleExpertScoreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("jobroleExpertScore", id.toString())).build();
    }

}
