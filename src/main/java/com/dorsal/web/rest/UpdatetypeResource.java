package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Updatetype;
import com.dorsal.repository.UpdatetypeRepository;
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
 * REST controller for managing Updatetype.
 */
@RestController
@RequestMapping("/api")
public class UpdatetypeResource {

    private final Logger log = LoggerFactory.getLogger(UpdatetypeResource.class);
        
    @Inject
    private UpdatetypeRepository updatetypeRepository;
    
    /**
     * POST  /updatetypes : Create a new updatetype.
     *
     * @param updatetype the updatetype to create
     * @return the ResponseEntity with status 201 (Created) and with body the new updatetype, or with status 400 (Bad Request) if the updatetype has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/updatetypes",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Updatetype> createUpdatetype(@RequestBody Updatetype updatetype) throws URISyntaxException {
        log.debug("REST request to save Updatetype : {}", updatetype);
        if (updatetype.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("updatetype", "idexists", "A new updatetype cannot already have an ID")).body(null);
        }
        Updatetype result = updatetypeRepository.save(updatetype);
        return ResponseEntity.created(new URI("/api/updatetypes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("updatetype", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /updatetypes : Updates an existing updatetype.
     *
     * @param updatetype the updatetype to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated updatetype,
     * or with status 400 (Bad Request) if the updatetype is not valid,
     * or with status 500 (Internal Server Error) if the updatetype couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/updatetypes",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Updatetype> updateUpdatetype(@RequestBody Updatetype updatetype) throws URISyntaxException {
        log.debug("REST request to update Updatetype : {}", updatetype);
        if (updatetype.getId() == null) {
            return createUpdatetype(updatetype);
        }
        Updatetype result = updatetypeRepository.save(updatetype);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("updatetype", updatetype.getId().toString()))
            .body(result);
    }

    /**
     * GET  /updatetypes : get all the updatetypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of updatetypes in body
     */
    @RequestMapping(value = "/updatetypes",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Updatetype> getAllUpdatetypes() {
        log.debug("REST request to get all Updatetypes");
        List<Updatetype> updatetypes = updatetypeRepository.findAll();
        return updatetypes;
    }

    /**
     * GET  /updatetypes/:id : get the "id" updatetype.
     *
     * @param id the id of the updatetype to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the updatetype, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/updatetypes/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Updatetype> getUpdatetype(@PathVariable Long id) {
        log.debug("REST request to get Updatetype : {}", id);
        Updatetype updatetype = updatetypeRepository.findOne(id);
        return Optional.ofNullable(updatetype)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /updatetypes/:id : delete the "id" updatetype.
     *
     * @param id the id of the updatetype to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/updatetypes/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUpdatetype(@PathVariable Long id) {
        log.debug("REST request to delete Updatetype : {}", id);
        updatetypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("updatetype", id.toString())).build();
    }

}
