package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.TechnologyExpertScore;

import com.dorsal.repository.TechnologyExpertScoreRepository;
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
 * REST controller for managing TechnologyExpertScore.
 */
@RestController
@RequestMapping("/api")
public class TechnologyExpertScoreResource {

    private final Logger log = LoggerFactory.getLogger(TechnologyExpertScoreResource.class);
        
    @Inject
    private TechnologyExpertScoreRepository technologyExpertScoreRepository;

    /**
     * POST  /technology-expert-scores : Create a new technologyExpertScore.
     *
     * @param technologyExpertScore the technologyExpertScore to create
     * @return the ResponseEntity with status 201 (Created) and with body the new technologyExpertScore, or with status 400 (Bad Request) if the technologyExpertScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technology-expert-scores",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TechnologyExpertScore> createTechnologyExpertScore(@RequestBody TechnologyExpertScore technologyExpertScore) throws URISyntaxException {
        log.debug("REST request to save TechnologyExpertScore : {}", technologyExpertScore);
        if (technologyExpertScore.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologyExpertScore", "idexists", "A new technologyExpertScore cannot already have an ID")).body(null);
        }
        TechnologyExpertScore result = technologyExpertScoreRepository.save(technologyExpertScore);
        return ResponseEntity.created(new URI("/api/technology-expert-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("technologyExpertScore", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /technology-expert-scores : Updates an existing technologyExpertScore.
     *
     * @param technologyExpertScore the technologyExpertScore to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated technologyExpertScore,
     * or with status 400 (Bad Request) if the technologyExpertScore is not valid,
     * or with status 500 (Internal Server Error) if the technologyExpertScore couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technology-expert-scores",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TechnologyExpertScore> updateTechnologyExpertScore(@RequestBody TechnologyExpertScore technologyExpertScore) throws URISyntaxException {
        log.debug("REST request to update TechnologyExpertScore : {}", technologyExpertScore);
        if (technologyExpertScore.getId() == null) {
            return createTechnologyExpertScore(technologyExpertScore);
        }
        TechnologyExpertScore result = technologyExpertScoreRepository.save(technologyExpertScore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("technologyExpertScore", technologyExpertScore.getId().toString()))
            .body(result);
    }

    /**
     * GET  /technology-expert-scores : get all the technologyExpertScores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of technologyExpertScores in body
     */
    @RequestMapping(value = "/technology-expert-scores",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<TechnologyExpertScore> getAllTechnologyExpertScores() {
        log.debug("REST request to get all TechnologyExpertScores");
        List<TechnologyExpertScore> technologyExpertScores = technologyExpertScoreRepository.findAll();
        return technologyExpertScores;
    }

    /**
     * GET  /technology-expert-scores/:id : get the "id" technologyExpertScore.
     *
     * @param id the id of the technologyExpertScore to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the technologyExpertScore, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/technology-expert-scores/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TechnologyExpertScore> getTechnologyExpertScore(@PathVariable Long id) {
        log.debug("REST request to get TechnologyExpertScore : {}", id);
        TechnologyExpertScore technologyExpertScore = technologyExpertScoreRepository.findOne(id);
        return Optional.ofNullable(technologyExpertScore)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /technology-expert-scores/:id : delete the "id" technologyExpertScore.
     *
     * @param id the id of the technologyExpertScore to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/technology-expert-scores/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTechnologyExpertScore(@PathVariable Long id) {
        log.debug("REST request to delete TechnologyExpertScore : {}", id);
        technologyExpertScoreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("technologyExpertScore", id.toString())).build();
    }

}
