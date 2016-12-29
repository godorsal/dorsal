package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Speciality;

import com.dorsal.repository.SpecialityRepository;
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
 * REST controller for managing Speciality.
 */
@RestController
@RequestMapping("/api")
public class SpecialityResource {

    private final Logger log = LoggerFactory.getLogger(SpecialityResource.class);
        
    @Inject
    private SpecialityRepository specialityRepository;

    /**
     * POST  /specialities : Create a new speciality.
     *
     * @param speciality the speciality to create
     * @return the ResponseEntity with status 201 (Created) and with body the new speciality, or with status 400 (Bad Request) if the speciality has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/specialities",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Speciality> createSpeciality(@Valid @RequestBody Speciality speciality) throws URISyntaxException {
        log.debug("REST request to save Speciality : {}", speciality);
        if (speciality.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("speciality", "idexists", "A new speciality cannot already have an ID")).body(null);
        }
        Speciality result = specialityRepository.save(speciality);
        return ResponseEntity.created(new URI("/api/specialities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("speciality", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /specialities : Updates an existing speciality.
     *
     * @param speciality the speciality to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated speciality,
     * or with status 400 (Bad Request) if the speciality is not valid,
     * or with status 500 (Internal Server Error) if the speciality couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/specialities",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Speciality> updateSpeciality(@Valid @RequestBody Speciality speciality) throws URISyntaxException {
        log.debug("REST request to update Speciality : {}", speciality);
        if (speciality.getId() == null) {
            return createSpeciality(speciality);
        }
        Speciality result = specialityRepository.save(speciality);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("speciality", speciality.getId().toString()))
            .body(result);
    }

    /**
     * GET  /specialities : get all the specialities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of specialities in body
     */
    @RequestMapping(value = "/specialities",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Speciality> getAllSpecialities() {
        log.debug("REST request to get all Specialities");
        List<Speciality> specialities = specialityRepository.findAll();
        return specialities;
    }

    /**
     * GET  /specialities/:id : get the "id" speciality.
     *
     * @param id the id of the speciality to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the speciality, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/specialities/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Speciality> getSpeciality(@PathVariable Long id) {
        log.debug("REST request to get Speciality : {}", id);
        Speciality speciality = specialityRepository.findOne(id);
        return Optional.ofNullable(speciality)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /specialities/:id : delete the "id" speciality.
     *
     * @param id the id of the speciality to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/specialities/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSpeciality(@PathVariable Long id) {
        log.debug("REST request to delete Speciality : {}", id);
        specialityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("speciality", id.toString())).build();
    }

}
