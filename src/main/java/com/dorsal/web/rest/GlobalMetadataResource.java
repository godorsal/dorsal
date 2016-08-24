package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.GlobalMetadata;
import com.dorsal.domain.User;
import com.dorsal.repository.GlobalMetadataRepository;
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
 * REST controller for managing GlobalMetadata.
 */
@RestController
@RequestMapping("/api")
public class GlobalMetadataResource {

    private final Logger log = LoggerFactory.getLogger(GlobalMetadataResource.class);

    @Inject
    private GlobalMetadataRepository globalMetadataRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    /**
     * POST  /global-metadata : Create a new globalMetadata.
     *
     * @param globalMetadata the globalMetadata to create
     * @return the ResponseEntity with status 201 (Created) and with body the new globalMetadata, or with status 400 (Bad Request) if the globalMetadata has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/global-metadata",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<GlobalMetadata> createGlobalMetadata(@RequestBody GlobalMetadata globalMetadata) throws URISyntaxException {
        log.debug("REST request to save GlobalMetadata : {}", globalMetadata);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("GlobalMetadata Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("globalMetadata", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (globalMetadata.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("globalMetadata", "idexists", "A new globalMetadata cannot already have an ID")).body(null);
        }
        GlobalMetadata result = globalMetadataRepository.save(globalMetadata);
        return ResponseEntity.created(new URI("/api/global-metadata/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("globalMetadata", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /global-metadata : Updates an existing globalMetadata.
     *
     * @param globalMetadata the globalMetadata to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated globalMetadata,
     * or with status 400 (Bad Request) if the globalMetadata is not valid,
     * or with status 500 (Internal Server Error) if the globalMetadata couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/global-metadata",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<GlobalMetadata> updateGlobalMetadata(@RequestBody GlobalMetadata globalMetadata) throws URISyntaxException {
        log.debug("REST request to update GlobalMetadata : {}", globalMetadata);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("GlobalMetadata Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("globalMetadata", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (globalMetadata.getId() == null) {
            return createGlobalMetadata(globalMetadata);
        }
        GlobalMetadata result = globalMetadataRepository.save(globalMetadata);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("globalMetadata", globalMetadata.getId().toString()))
            .body(result);
    }

    /**
     * GET  /global-metadata : get all the globalMetadata.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of globalMetadata in body
     */
    @RequestMapping(value = "/global-metadata",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<GlobalMetadata> getAllGlobalMetadata() {
        log.debug("REST request to get all GlobalMetadata");
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        return globalMetadata;
    }

    /**
     * GET  /global-metadata/:id : get the "id" globalMetadata.
     *
     * @param id the id of the globalMetadata to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the globalMetadata, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/global-metadata/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<GlobalMetadata> getGlobalMetadata(@PathVariable Long id) {
        log.debug("REST request to get GlobalMetadata : {}", id);
        GlobalMetadata globalMetadata = globalMetadataRepository.findOne(id);
        return Optional.ofNullable(globalMetadata)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /global-metadata/:id : delete the "id" globalMetadata.
     *
     * @param id the id of the globalMetadata to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/global-metadata/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteGlobalMetadata(@PathVariable Long id) {
        log.debug("REST request to delete GlobalMetadata : {}", id);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("GlobalMetadata Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("globalMetadata", "accessrefused", "No permissions for this operations")).body(null);
        }
        globalMetadataRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("globalMetadata", id.toString())).build();
    }

}
