package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.SpecialityExpertScore;

import com.dorsal.repository.SpecialityExpertScoreRepository;
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
 * REST controller for managing SpecialityExpertScore.
 */
@RestController
@RequestMapping("/api")
public class SpecialityExpertScoreResource {

    private final Logger log = LoggerFactory.getLogger(SpecialityExpertScoreResource.class);
        
    @Inject
    private SpecialityExpertScoreRepository specialityExpertScoreRepository;

    /**
     * POST  /speciality-expert-scores : Create a new specialityExpertScore.
     *
     * @param specialityExpertScore the specialityExpertScore to create
     * @return the ResponseEntity with status 201 (Created) and with body the new specialityExpertScore, or with status 400 (Bad Request) if the specialityExpertScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/speciality-expert-scores",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SpecialityExpertScore> createSpecialityExpertScore(@RequestBody SpecialityExpertScore specialityExpertScore) throws URISyntaxException {
        log.debug("REST request to save SpecialityExpertScore : {}", specialityExpertScore);
        if (specialityExpertScore.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("specialityExpertScore", "idexists", "A new specialityExpertScore cannot already have an ID")).body(null);
        }
        SpecialityExpertScore result = specialityExpertScoreRepository.save(specialityExpertScore);
        return ResponseEntity.created(new URI("/api/speciality-expert-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("specialityExpertScore", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /speciality-expert-scores : Updates an existing specialityExpertScore.
     *
     * @param specialityExpertScore the specialityExpertScore to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated specialityExpertScore,
     * or with status 400 (Bad Request) if the specialityExpertScore is not valid,
     * or with status 500 (Internal Server Error) if the specialityExpertScore couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/speciality-expert-scores",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SpecialityExpertScore> updateSpecialityExpertScore(@RequestBody SpecialityExpertScore specialityExpertScore) throws URISyntaxException {
        log.debug("REST request to update SpecialityExpertScore : {}", specialityExpertScore);
        if (specialityExpertScore.getId() == null) {
            return createSpecialityExpertScore(specialityExpertScore);
        }
        SpecialityExpertScore result = specialityExpertScoreRepository.save(specialityExpertScore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("specialityExpertScore", specialityExpertScore.getId().toString()))
            .body(result);
    }

    /**
     * GET  /speciality-expert-scores : get all the specialityExpertScores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of specialityExpertScores in body
     */
    @RequestMapping(value = "/speciality-expert-scores",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<SpecialityExpertScore> getAllSpecialityExpertScores() {
        log.debug("REST request to get all SpecialityExpertScores");
        List<SpecialityExpertScore> specialityExpertScores = specialityExpertScoreRepository.findAll();
        return specialityExpertScores;
    }

    /**
     * GET  /speciality-expert-scores/:id : get the "id" specialityExpertScore.
     *
     * @param id the id of the specialityExpertScore to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the specialityExpertScore, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/speciality-expert-scores/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SpecialityExpertScore> getSpecialityExpertScore(@PathVariable Long id) {
        log.debug("REST request to get SpecialityExpertScore : {}", id);
        SpecialityExpertScore specialityExpertScore = specialityExpertScoreRepository.findOne(id);
        return Optional.ofNullable(specialityExpertScore)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /speciality-expert-scores/:id : delete the "id" specialityExpertScore.
     *
     * @param id the id of the specialityExpertScore to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/speciality-expert-scores/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSpecialityExpertScore(@PathVariable Long id) {
        log.debug("REST request to delete SpecialityExpertScore : {}", id);
        specialityExpertScoreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("specialityExpertScore", id.toString())).build();
    }

}
