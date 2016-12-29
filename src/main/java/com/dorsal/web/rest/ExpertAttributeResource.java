package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAttribute;

import com.dorsal.repository.ExpertAttributeRepository;
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
 * REST controller for managing ExpertAttribute.
 */
@RestController
@RequestMapping("/api")
public class ExpertAttributeResource {

    private final Logger log = LoggerFactory.getLogger(ExpertAttributeResource.class);
        
    @Inject
    private ExpertAttributeRepository expertAttributeRepository;

    /**
     * POST  /expert-attributes : Create a new expertAttribute.
     *
     * @param expertAttribute the expertAttribute to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expertAttribute, or with status 400 (Bad Request) if the expertAttribute has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-attributes",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAttribute> createExpertAttribute(@Valid @RequestBody ExpertAttribute expertAttribute) throws URISyntaxException {
        log.debug("REST request to save ExpertAttribute : {}", expertAttribute);
        if (expertAttribute.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertAttribute", "idexists", "A new expertAttribute cannot already have an ID")).body(null);
        }
        ExpertAttribute result = expertAttributeRepository.save(expertAttribute);
        return ResponseEntity.created(new URI("/api/expert-attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("expertAttribute", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expert-attributes : Updates an existing expertAttribute.
     *
     * @param expertAttribute the expertAttribute to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expertAttribute,
     * or with status 400 (Bad Request) if the expertAttribute is not valid,
     * or with status 500 (Internal Server Error) if the expertAttribute couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-attributes",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAttribute> updateExpertAttribute(@Valid @RequestBody ExpertAttribute expertAttribute) throws URISyntaxException {
        log.debug("REST request to update ExpertAttribute : {}", expertAttribute);
        if (expertAttribute.getId() == null) {
            return createExpertAttribute(expertAttribute);
        }
        ExpertAttribute result = expertAttributeRepository.save(expertAttribute);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("expertAttribute", expertAttribute.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expert-attributes : get all the expertAttributes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertAttributes in body
     */
    @RequestMapping(value = "/expert-attributes",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertAttribute> getAllExpertAttributes() {
        log.debug("REST request to get all ExpertAttributes");
        List<ExpertAttribute> expertAttributes = expertAttributeRepository.findAll();
        return expertAttributes;
    }

    /**
     * GET  /expert-attributes/:id : get the "id" expertAttribute.
     *
     * @param id the id of the expertAttribute to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expertAttribute, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/expert-attributes/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAttribute> getExpertAttribute(@PathVariable Long id) {
        log.debug("REST request to get ExpertAttribute : {}", id);
        ExpertAttribute expertAttribute = expertAttributeRepository.findOne(id);
        return Optional.ofNullable(expertAttribute)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /expert-attributes/:id : delete the "id" expertAttribute.
     *
     * @param id the id of the expertAttribute to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/expert-attributes/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteExpertAttribute(@PathVariable Long id) {
        log.debug("REST request to delete ExpertAttribute : {}", id);
        expertAttributeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("expertAttribute", id.toString())).build();
    }

}
