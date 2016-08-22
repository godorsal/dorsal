package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Technologyproperty;
import com.dorsal.domain.User;
import com.dorsal.repository.TechnologypropertyRepository;
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
 * REST controller for managing Technologyproperty.
 */
@RestController
@RequestMapping("/api")
public class TechnologypropertyResource {

    private final Logger log = LoggerFactory.getLogger(TechnologypropertyResource.class);

    @Inject
    private TechnologypropertyRepository technologypropertyRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    /**
     * POST  /technologyproperties : Create a new technologyproperty.
     *
     * @param technologyproperty the technologyproperty to create
     * @return the ResponseEntity with status 201 (Created) and with body the new technologyproperty, or with status 400 (Bad Request) if the technologyproperty has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technologyproperties",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Technologyproperty> createTechnologyproperty(@RequestBody Technologyproperty technologyproperty) throws URISyntaxException {
        log.debug("REST request to save Technologyproperty : {}", technologyproperty);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("TechnologyProperty Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologyproperty", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (technologyproperty.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologyproperty", "idexists", "A new technologyproperty cannot already have an ID")).body(null);
        }
        Technologyproperty result = technologypropertyRepository.save(technologyproperty);
        return ResponseEntity.created(new URI("/api/technologyproperties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("technologyproperty", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /technologyproperties : Updates an existing technologyproperty.
     *
     * @param technologyproperty the technologyproperty to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated technologyproperty,
     * or with status 400 (Bad Request) if the technologyproperty is not valid,
     * or with status 500 (Internal Server Error) if the technologyproperty couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technologyproperties",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Technologyproperty> updateTechnologyproperty(@RequestBody Technologyproperty technologyproperty) throws URISyntaxException {
        log.debug("REST request to update Technologyproperty : {}", technologyproperty);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("TechnologyProperty Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologyproperty", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (technologyproperty.getId() == null) {
            return createTechnologyproperty(technologyproperty);
        }
        Technologyproperty result = technologypropertyRepository.save(technologyproperty);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("technologyproperty", technologyproperty.getId().toString()))
            .body(result);
    }

    /**
     * GET  /technologyproperties : get all the technologyproperties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of technologyproperties in body
     */
    @RequestMapping(value = "/technologyproperties",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Technologyproperty> getAllTechnologyproperties() {
        log.debug("REST request to get all Technologyproperties");
        List<Technologyproperty> technologyproperties = technologypropertyRepository.findAll();
        return technologyproperties;
    }

    /**
     * GET  /technologyproperties/:id : get the "id" technologyproperty.
     *
     * @param id the id of the technologyproperty to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the technologyproperty, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/technologyproperties/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Technologyproperty> getTechnologyproperty(@PathVariable Long id) {
        log.debug("REST request to get Technologyproperty : {}", id);
        Technologyproperty technologyproperty = technologypropertyRepository.findOne(id);
        return Optional.ofNullable(technologyproperty)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /technologyproperties/:id : delete the "id" technologyproperty.
     *
     * @param id the id of the technologyproperty to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/technologyproperties/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTechnologyproperty(@PathVariable Long id) {
        log.debug("REST request to delete Technologyproperty : {}", id);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("TechnologyProperty Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technologyproperty", "accessrefused", "No permissions for this operations")).body(null);
        }
        technologypropertyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("technologyproperty", id.toString())).build();
    }

}
