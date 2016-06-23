package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Casetechnologyproperty;
import com.dorsal.repository.CasetechnologypropertyRepository;
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
 * REST controller for managing Casetechnologyproperty.
 */
@RestController
@RequestMapping("/api")
public class CasetechnologypropertyResource {

    private final Logger log = LoggerFactory.getLogger(CasetechnologypropertyResource.class);
        
    @Inject
    private CasetechnologypropertyRepository casetechnologypropertyRepository;
    
    /**
     * POST  /casetechnologyproperties : Create a new casetechnologyproperty.
     *
     * @param casetechnologyproperty the casetechnologyproperty to create
     * @return the ResponseEntity with status 201 (Created) and with body the new casetechnologyproperty, or with status 400 (Bad Request) if the casetechnologyproperty has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/casetechnologyproperties",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Casetechnologyproperty> createCasetechnologyproperty(@RequestBody Casetechnologyproperty casetechnologyproperty) throws URISyntaxException {
        log.debug("REST request to save Casetechnologyproperty : {}", casetechnologyproperty);
        if (casetechnologyproperty.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("casetechnologyproperty", "idexists", "A new casetechnologyproperty cannot already have an ID")).body(null);
        }
        Casetechnologyproperty result = casetechnologypropertyRepository.save(casetechnologyproperty);
        return ResponseEntity.created(new URI("/api/casetechnologyproperties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("casetechnologyproperty", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /casetechnologyproperties : Updates an existing casetechnologyproperty.
     *
     * @param casetechnologyproperty the casetechnologyproperty to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated casetechnologyproperty,
     * or with status 400 (Bad Request) if the casetechnologyproperty is not valid,
     * or with status 500 (Internal Server Error) if the casetechnologyproperty couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/casetechnologyproperties",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Casetechnologyproperty> updateCasetechnologyproperty(@RequestBody Casetechnologyproperty casetechnologyproperty) throws URISyntaxException {
        log.debug("REST request to update Casetechnologyproperty : {}", casetechnologyproperty);
        if (casetechnologyproperty.getId() == null) {
            return createCasetechnologyproperty(casetechnologyproperty);
        }
        Casetechnologyproperty result = casetechnologypropertyRepository.save(casetechnologyproperty);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("casetechnologyproperty", casetechnologyproperty.getId().toString()))
            .body(result);
    }

    /**
     * GET  /casetechnologyproperties : get all the casetechnologyproperties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of casetechnologyproperties in body
     */
    @RequestMapping(value = "/casetechnologyproperties",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Casetechnologyproperty> getAllCasetechnologyproperties() {
        log.debug("REST request to get all Casetechnologyproperties");
        List<Casetechnologyproperty> casetechnologyproperties = casetechnologypropertyRepository.findAll();
        return casetechnologyproperties;
    }

    /**
     * GET  /casetechnologyproperties/:id : get the "id" casetechnologyproperty.
     *
     * @param id the id of the casetechnologyproperty to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the casetechnologyproperty, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/casetechnologyproperties/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Casetechnologyproperty> getCasetechnologyproperty(@PathVariable Long id) {
        log.debug("REST request to get Casetechnologyproperty : {}", id);
        Casetechnologyproperty casetechnologyproperty = casetechnologypropertyRepository.findOne(id);
        return Optional.ofNullable(casetechnologyproperty)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /casetechnologyproperties/:id : delete the "id" casetechnologyproperty.
     *
     * @param id the id of the casetechnologyproperty to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/casetechnologyproperties/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCasetechnologyproperty(@PathVariable Long id) {
        log.debug("REST request to delete Casetechnologyproperty : {}", id);
        casetechnologypropertyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("casetechnologyproperty", id.toString())).build();
    }

}
