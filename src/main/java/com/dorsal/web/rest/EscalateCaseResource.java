package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.EscalateCase;
import com.dorsal.repository.EscalateCaseRepository;
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
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EscalateCase.
 */
@RestController
@RequestMapping("/api")
public class EscalateCaseResource {

    private final Logger log = LoggerFactory.getLogger(EscalateCaseResource.class);

    @Inject
    private EscalateCaseRepository escalateCaseRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    /**
     * POST  /escalate-cases : Create a new escalateCase.
     *
     * @param escalateCase the escalateCase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new escalateCase, or with status 400 (Bad Request) if the escalateCase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/escalate-cases",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<EscalateCase> createEscalateCase(@Valid @RequestBody EscalateCase escalateCase) throws URISyntaxException {
        log.debug("REST request to save EscalateCase : {}", escalateCase);
        if (escalateCase.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("escalateCase", "idexists", "A new escalateCase cannot already have an ID")).body(null);
        }

        // Get the current logged in user to be used as the case creator
        escalateCase.setUser(userRepository.findLoggedInUser());

        // Adjust time
        escalateCase.setDateEscalated(ZonedDateTime.now());

        EscalateCase result = escalateCaseRepository.save(escalateCase);
        return ResponseEntity.created(new URI("/api/escalate-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("escalateCase", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /escalate-cases : Updates an existing escalateCase.
     *
     * @param escalateCase the escalateCase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated escalateCase,
     * or with status 400 (Bad Request) if the escalateCase is not valid,
     * or with status 500 (Internal Server Error) if the escalateCase couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/escalate-cases",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<EscalateCase> updateEscalateCase(@Valid @RequestBody EscalateCase escalateCase) throws URISyntaxException {
        log.debug("REST request to update EscalateCase : {}", escalateCase);
        if (escalateCase.getId() == null) {
            return createEscalateCase(escalateCase);
        }
        EscalateCase result = escalateCaseRepository.save(escalateCase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("escalateCase", escalateCase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /escalate-cases : get all the escalateCases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of escalateCases in body
     */
    @RequestMapping(value = "/escalate-cases",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<EscalateCase> getAllEscalateCases() {
        log.debug("REST request to get all EscalateCases");
        List<EscalateCase> escalateCases = escalateCaseRepository.findAll();
        return escalateCases;
    }

    /**
     * GET  /escalate-cases/:id : get the "id" escalateCase.
     *
     * @param id the id of the escalateCase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the escalateCase, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/escalate-cases/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<EscalateCase> getEscalateCase(@PathVariable Long id) {
        log.debug("REST request to get EscalateCase : {}", id);
        EscalateCase escalateCase = escalateCaseRepository.findOne(id);
        return Optional.ofNullable(escalateCase)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /escalate-cases/:id : delete the "id" escalateCase.
     *
     * @param id the id of the escalateCase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/escalate-cases/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteEscalateCase(@PathVariable Long id) {
        log.debug("REST request to delete EscalateCase : {}", id);
        escalateCaseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("escalateCase", id.toString())).build();
    }

}
