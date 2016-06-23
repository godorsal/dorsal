package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Groupaccess;
import com.dorsal.repository.GroupaccessRepository;
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
 * REST controller for managing Groupaccess.
 */
@RestController
@RequestMapping("/api")
public class GroupaccessResource {

    private final Logger log = LoggerFactory.getLogger(GroupaccessResource.class);
        
    @Inject
    private GroupaccessRepository groupaccessRepository;
    
    /**
     * POST  /groupaccesses : Create a new groupaccess.
     *
     * @param groupaccess the groupaccess to create
     * @return the ResponseEntity with status 201 (Created) and with body the new groupaccess, or with status 400 (Bad Request) if the groupaccess has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/groupaccesses",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Groupaccess> createGroupaccess(@RequestBody Groupaccess groupaccess) throws URISyntaxException {
        log.debug("REST request to save Groupaccess : {}", groupaccess);
        if (groupaccess.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("groupaccess", "idexists", "A new groupaccess cannot already have an ID")).body(null);
        }
        Groupaccess result = groupaccessRepository.save(groupaccess);
        return ResponseEntity.created(new URI("/api/groupaccesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("groupaccess", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /groupaccesses : Updates an existing groupaccess.
     *
     * @param groupaccess the groupaccess to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated groupaccess,
     * or with status 400 (Bad Request) if the groupaccess is not valid,
     * or with status 500 (Internal Server Error) if the groupaccess couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/groupaccesses",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Groupaccess> updateGroupaccess(@RequestBody Groupaccess groupaccess) throws URISyntaxException {
        log.debug("REST request to update Groupaccess : {}", groupaccess);
        if (groupaccess.getId() == null) {
            return createGroupaccess(groupaccess);
        }
        Groupaccess result = groupaccessRepository.save(groupaccess);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("groupaccess", groupaccess.getId().toString()))
            .body(result);
    }

    /**
     * GET  /groupaccesses : get all the groupaccesses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of groupaccesses in body
     */
    @RequestMapping(value = "/groupaccesses",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Groupaccess> getAllGroupaccesses() {
        log.debug("REST request to get all Groupaccesses");
        List<Groupaccess> groupaccesses = groupaccessRepository.findAll();
        return groupaccesses;
    }

    /**
     * GET  /groupaccesses/:id : get the "id" groupaccess.
     *
     * @param id the id of the groupaccess to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the groupaccess, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/groupaccesses/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Groupaccess> getGroupaccess(@PathVariable Long id) {
        log.debug("REST request to get Groupaccess : {}", id);
        Groupaccess groupaccess = groupaccessRepository.findOne(id);
        return Optional.ofNullable(groupaccess)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /groupaccesses/:id : delete the "id" groupaccess.
     *
     * @param id the id of the groupaccess to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/groupaccesses/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteGroupaccess(@PathVariable Long id) {
        log.debug("REST request to delete Groupaccess : {}", id);
        groupaccessRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("groupaccess", id.toString())).build();
    }

}
