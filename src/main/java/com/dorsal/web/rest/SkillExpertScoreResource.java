package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.SkillExpertScore;

import com.dorsal.repository.SkillExpertScoreRepository;
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
 * REST controller for managing SkillExpertScore.
 */
@RestController
@RequestMapping("/api")
public class SkillExpertScoreResource {

    private final Logger log = LoggerFactory.getLogger(SkillExpertScoreResource.class);

    @Inject
    private SkillExpertScoreRepository skillExpertScoreRepository;

    /**
     * POST  /skill-expert-scores : Create a new skillExpertScore.
     *
     * @param skillExpertScore the skillExpertScore to create
     * @return the ResponseEntity with status 201 (Created) and with body the new skillExpertScore, or with status 400 (Bad Request) if the skillExpertScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/skill-expert-scores",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SkillExpertScore> createSkillExpertScore(@RequestBody SkillExpertScore skillExpertScore) throws URISyntaxException {
        log.debug("REST request to save SkillExpertScore : {}", skillExpertScore);
        if (skillExpertScore.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("skillExpertScore", "idexists", "A new skillExpertScore cannot already have an ID")).body(null);
        }
        SkillExpertScore result = skillExpertScoreRepository.save(skillExpertScore);
        return ResponseEntity.created(new URI("/api/skill-expert-scores/" + result.getId()))
            // .headers(HeaderUtil.createEntityCreationAlert("skillExpertScore", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /skill-expert-scores : Updates an existing skillExpertScore.
     *
     * @param skillExpertScore the skillExpertScore to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated skillExpertScore,
     * or with status 400 (Bad Request) if the skillExpertScore is not valid,
     * or with status 500 (Internal Server Error) if the skillExpertScore couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/skill-expert-scores",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SkillExpertScore> updateSkillExpertScore(@RequestBody SkillExpertScore skillExpertScore) throws URISyntaxException {
        log.debug("REST request to update SkillExpertScore : {}", skillExpertScore);
        if (skillExpertScore.getId() == null) {
            return createSkillExpertScore(skillExpertScore);
        }
        SkillExpertScore result = skillExpertScoreRepository.save(skillExpertScore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("skillExpertScore", skillExpertScore.getId().toString()))
            .body(result);
    }

    /**
     * GET  /skill-expert-scores : get all the skillExpertScores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of skillExpertScores in body
     */
    @RequestMapping(value = "/skill-expert-scores",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<SkillExpertScore> getAllSkillExpertScores() {
        log.debug("REST request to get all SkillExpertScores");
        List<SkillExpertScore> skillExpertScores = skillExpertScoreRepository.findByUserIsCurrentUser();
        return skillExpertScores;
    }

    /**
     * GET  /skill-expert-scores/:id : get the "id" skillExpertScore.
     *
     * @param id the id of the skillExpertScore to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the skillExpertScore, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/skill-expert-scores/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SkillExpertScore> getSkillExpertScore(@PathVariable Long id) {
        log.debug("REST request to get SkillExpertScore : {}", id);
        SkillExpertScore skillExpertScore = skillExpertScoreRepository.findOne(id);
        return Optional.ofNullable(skillExpertScore)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /skill-expert-scores/:id : delete the "id" skillExpertScore.
     *
     * @param id the id of the skillExpertScore to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/skill-expert-scores/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSkillExpertScore(@PathVariable Long id) {
        log.debug("REST request to delete SkillExpertScore : {}", id);
        skillExpertScoreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("skillExpertScore", id.toString())).build();
    }

}
