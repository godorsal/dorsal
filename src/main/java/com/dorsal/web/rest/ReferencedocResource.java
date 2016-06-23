package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Referencedoc;
import com.dorsal.repository.ReferencedocRepository;
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
 * REST controller for managing Referencedoc.
 */
@RestController
@RequestMapping("/api")
public class ReferencedocResource {

    private final Logger log = LoggerFactory.getLogger(ReferencedocResource.class);
        
    @Inject
    private ReferencedocRepository referencedocRepository;
    
    /**
     * POST  /referencedocs : Create a new referencedoc.
     *
     * @param referencedoc the referencedoc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new referencedoc, or with status 400 (Bad Request) if the referencedoc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/referencedocs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Referencedoc> createReferencedoc(@RequestBody Referencedoc referencedoc) throws URISyntaxException {
        log.debug("REST request to save Referencedoc : {}", referencedoc);
        if (referencedoc.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("referencedoc", "idexists", "A new referencedoc cannot already have an ID")).body(null);
        }
        Referencedoc result = referencedocRepository.save(referencedoc);
        return ResponseEntity.created(new URI("/api/referencedocs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("referencedoc", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /referencedocs : Updates an existing referencedoc.
     *
     * @param referencedoc the referencedoc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated referencedoc,
     * or with status 400 (Bad Request) if the referencedoc is not valid,
     * or with status 500 (Internal Server Error) if the referencedoc couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/referencedocs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Referencedoc> updateReferencedoc(@RequestBody Referencedoc referencedoc) throws URISyntaxException {
        log.debug("REST request to update Referencedoc : {}", referencedoc);
        if (referencedoc.getId() == null) {
            return createReferencedoc(referencedoc);
        }
        Referencedoc result = referencedocRepository.save(referencedoc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("referencedoc", referencedoc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /referencedocs : get all the referencedocs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of referencedocs in body
     */
    @RequestMapping(value = "/referencedocs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Referencedoc> getAllReferencedocs() {
        log.debug("REST request to get all Referencedocs");
        List<Referencedoc> referencedocs = referencedocRepository.findAll();
        return referencedocs;
    }

    /**
     * GET  /referencedocs/:id : get the "id" referencedoc.
     *
     * @param id the id of the referencedoc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the referencedoc, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/referencedocs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Referencedoc> getReferencedoc(@PathVariable Long id) {
        log.debug("REST request to get Referencedoc : {}", id);
        Referencedoc referencedoc = referencedocRepository.findOne(id);
        return Optional.ofNullable(referencedoc)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /referencedocs/:id : delete the "id" referencedoc.
     *
     * @param id the id of the referencedoc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/referencedocs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteReferencedoc(@PathVariable Long id) {
        log.debug("REST request to delete Referencedoc : {}", id);
        referencedocRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("referencedoc", id.toString())).build();
    }

}
