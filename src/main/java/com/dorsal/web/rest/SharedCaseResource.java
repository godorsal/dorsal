package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.SharedCase;
import com.dorsal.repository.SharedCaseRepository;
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
 * REST controller for managing SharedCase.
 */
@RestController
@RequestMapping("/api")
public class SharedCaseResource {

    private final Logger log = LoggerFactory.getLogger(SharedCaseResource.class);

    @Inject
    private SharedCaseRepository sharedCaseRepository;

    @Inject
    private UserRepository userRepository;

    /**
     * POST  /shared-cases : Create a new sharedCase.
     *
     * @param sharedCase the sharedCase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sharedCase, or with status 400 (Bad Request) if the sharedCase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/shared-cases",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SharedCase> createSharedCase(@RequestBody SharedCase sharedCase) throws URISyntaxException {
        log.debug("REST request to save SharedCase : {}", sharedCase);
        if (sharedCase.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("sharedCase", "idexists", "A new sharedCase cannot already have an ID")).body(null);
        }
        // Make sure only owner can define shares
        sharedCase.setOwner(userRepository.findLoggedInUser());

        // Make sure user only shares cases that he owns
        if (sharedCase.getOwner().getId().equals(sharedCase.getSupportcase().getUser().getId() ))
        {
            log.debug("Success Share owner and support owner match. Owner ID [" + sharedCase.getOwner().getId() + "] support case user ID [" + sharedCase.getSupportcase().getUser().getId() +"]");

        }
        else
        {
            // No match somebody tries to share a case that is not owned by same user
            log.error("Error: User not owner of the case. User [" + sharedCase.getOwner().getLogin() + "] tries to share case ID[" + sharedCase.getSupportcase().getId() + "] owned by user [" + sharedCase.getSupportcase().getUser().getLogin() +"]" );
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("sharedCase", "notowned", "Shared case is not owned by user")).body(null);

        }
        SharedCase result = sharedCaseRepository.save(sharedCase);
        return ResponseEntity.created(new URI("/api/shared-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("sharedCase", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shared-cases : Updates an existing sharedCase.
     *
     * @param sharedCase the sharedCase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sharedCase,
     * or with status 400 (Bad Request) if the sharedCase is not valid,
     * or with status 500 (Internal Server Error) if the sharedCase couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/shared-cases",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SharedCase> updateSharedCase(@RequestBody SharedCase sharedCase) throws URISyntaxException {
        log.debug("REST request to update SharedCase : {}", sharedCase);
        if (sharedCase.getId() == null) {
            return createSharedCase(sharedCase);
        }
        SharedCase result = sharedCaseRepository.save(sharedCase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("sharedCase", sharedCase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shared-cases : get all the sharedCases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sharedCases in body
     */
    @RequestMapping(value = "/shared-cases",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<SharedCase> getAllSharedCases() {
        log.debug("REST request to get all SharedCases");
        List<SharedCase> sharedCases = sharedCaseRepository.findAll();
        return sharedCases;
    }

    /**
     * GET  /shared-cases/:id : get the "id" sharedCase.
     *
     * @param id the id of the sharedCase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sharedCase, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/shared-cases/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SharedCase> getSharedCase(@PathVariable Long id) {
        log.debug("REST request to get SharedCase : {}", id);
        SharedCase sharedCase = sharedCaseRepository.findOne(id);
        return Optional.ofNullable(sharedCase)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /shared-cases/:id : delete the "id" sharedCase.
     *
     * @param id the id of the sharedCase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/shared-cases/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSharedCase(@PathVariable Long id) {
        log.debug("REST request to delete SharedCase : {}", id);
        sharedCaseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("sharedCase", id.toString())).build();
    }

}
