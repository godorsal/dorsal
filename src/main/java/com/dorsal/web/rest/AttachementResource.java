package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Attachement;
import com.dorsal.repository.AttachementRepository;
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
 * REST controller for managing Attachement.
 */
@RestController
@RequestMapping("/api")
public class AttachementResource {

    private final Logger log = LoggerFactory.getLogger(AttachementResource.class);
        
    @Inject
    private AttachementRepository attachementRepository;
    
    /**
     * POST  /attachements : Create a new attachement.
     *
     * @param attachement the attachement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attachement, or with status 400 (Bad Request) if the attachement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/attachements",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Attachement> createAttachement(@Valid @RequestBody Attachement attachement) throws URISyntaxException {
        log.debug("REST request to save Attachement : {}", attachement);
        if (attachement.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("attachement", "idexists", "A new attachement cannot already have an ID")).body(null);
        }
        Attachement result = attachementRepository.save(attachement);
        return ResponseEntity.created(new URI("/api/attachements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("attachement", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attachements : Updates an existing attachement.
     *
     * @param attachement the attachement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attachement,
     * or with status 400 (Bad Request) if the attachement is not valid,
     * or with status 500 (Internal Server Error) if the attachement couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/attachements",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Attachement> updateAttachement(@Valid @RequestBody Attachement attachement) throws URISyntaxException {
        log.debug("REST request to update Attachement : {}", attachement);
        if (attachement.getId() == null) {
            return createAttachement(attachement);
        }
        Attachement result = attachementRepository.save(attachement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("attachement", attachement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attachements : get all the attachements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attachements in body
     */
    @RequestMapping(value = "/attachements",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Attachement> getAllAttachements() {
        log.debug("REST request to get all Attachements");
        List<Attachement> attachements = attachementRepository.findAll();
        return attachements;
    }

    /**
     * GET  /attachements/:id : get the "id" attachement.
     *
     * @param id the id of the attachement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attachement, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/attachements/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Attachement> getAttachement(@PathVariable Long id) {
        log.debug("REST request to get Attachement : {}", id);
        Attachement attachement = attachementRepository.findOne(id);
        return Optional.ofNullable(attachement)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /attachements/:id : delete the "id" attachement.
     *
     * @param id the id of the attachement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/attachements/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteAttachement(@PathVariable Long id) {
        log.debug("REST request to delete Attachement : {}", id);
        attachementRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("attachement", id.toString())).build();
    }

}
