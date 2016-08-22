package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Technologypropertyvalue;
import com.dorsal.domain.User;
import com.dorsal.repository.TechnologypropertyvalueRepository;
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
 * REST controller for managing Technologypropertyvalue.
 */
@RestController
@RequestMapping("/api")
public class TechnologypropertyvalueResource {

    private final Logger log = LoggerFactory.getLogger(TechnologypropertyvalueResource.class);

    @Inject
    private TechnologypropertyvalueRepository technologypropertyvalueRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    /**
     * POST  /technologypropertyvalues : Create a new technologypropertyvalue.
     *
     * @param technologypropertyvalue the technologypropertyvalue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new technologypropertyvalue, or with status 400 (Bad Request) if the technologypropertyvalue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technologypropertyvalues",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Technologypropertyvalue> createTechnologypropertyvalue(@RequestBody Technologypropertyvalue technologypropertyvalue) throws URISyntaxException {
        log.debug("REST request to save Technologypropertyvalue : {}", technologypropertyvalue);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("TechnologyPropertyValue Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologypropertyvalue", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (technologypropertyvalue.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologypropertyvalue", "idexists", "A new technologypropertyvalue cannot already have an ID")).body(null);
        }
        Technologypropertyvalue result = technologypropertyvalueRepository.save(technologypropertyvalue);
        return ResponseEntity.created(new URI("/api/technologypropertyvalues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("technologypropertyvalue", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /technologypropertyvalues : Updates an existing technologypropertyvalue.
     *
     * @param technologypropertyvalue the technologypropertyvalue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated technologypropertyvalue,
     * or with status 400 (Bad Request) if the technologypropertyvalue is not valid,
     * or with status 500 (Internal Server Error) if the technologypropertyvalue couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technologypropertyvalues",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Technologypropertyvalue> updateTechnologypropertyvalue(@RequestBody Technologypropertyvalue technologypropertyvalue) throws URISyntaxException {
        log.debug("REST request to update Technologypropertyvalue : {}", technologypropertyvalue);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("TechnologyPropertyValue Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologypropertyvalue", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (technologypropertyvalue.getId() == null) {
            return createTechnologypropertyvalue(technologypropertyvalue);
        }
        Technologypropertyvalue result = technologypropertyvalueRepository.save(technologypropertyvalue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("technologypropertyvalue", technologypropertyvalue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /technologypropertyvalues : get all the technologypropertyvalues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of technologypropertyvalues in body
     */
    @RequestMapping(value = "/technologypropertyvalues",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Technologypropertyvalue> getAllTechnologypropertyvalues() {
        log.debug("REST request to get all Technologypropertyvalues");
        List<Technologypropertyvalue> technologypropertyvalues = technologypropertyvalueRepository.findAll();
        return technologypropertyvalues;
    }

    /**
     * GET  /technologypropertyvalues/:id : get the "id" technologypropertyvalue.
     *
     * @param id the id of the technologypropertyvalue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the technologypropertyvalue, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/technologypropertyvalues/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Technologypropertyvalue> getTechnologypropertyvalue(@PathVariable Long id) {
        log.debug("REST request to get Technologypropertyvalue : {}", id);
        Technologypropertyvalue technologypropertyvalue = technologypropertyvalueRepository.findOne(id);
        return Optional.ofNullable(technologypropertyvalue)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /technologypropertyvalues/:id : delete the "id" technologypropertyvalue.
     *
     * @param id the id of the technologypropertyvalue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/technologypropertyvalues/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTechnologypropertyvalue(@PathVariable Long id) {
        log.debug("REST request to delete Technologypropertyvalue : {}", id);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("TechnologyPropertyValue Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologypropertyvalue", "accessrefused", "No permissions for this operations")).body(null);
        }
        technologypropertyvalueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("technologypropertyvalue", id.toString())).build();
    }

}
