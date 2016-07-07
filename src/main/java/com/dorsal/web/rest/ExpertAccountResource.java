package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.repository.ExpertAccountRepository;
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
 * REST controller for managing ExpertAccount.
 */
@RestController
@RequestMapping("/api")
public class ExpertAccountResource {

    private final Logger log = LoggerFactory.getLogger(ExpertAccountResource.class);

    @Inject
    private ExpertAccountRepository expertAccountRepository;

    /**
     * POST  /expert-accounts : Create a new expertAccount.
     *
     * @param expertAccount the expertAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expertAccount, or with status 400 (Bad Request) if the expertAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-accounts",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAccount> createExpertAccount(@Valid @RequestBody ExpertAccount expertAccount) throws URISyntaxException {
        log.debug("REST request to save ExpertAccount : {}", expertAccount);
        if (expertAccount.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("expertAccount", "idexists", "A new expertAccount cannot already have an ID")).body(null);
        }
        ExpertAccount result = expertAccountRepository.save(expertAccount);
        return ResponseEntity.created(new URI("/api/expert-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("expertAccount", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expert-accounts : Updates an existing expertAccount.
     *
     * @param expertAccount the expertAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expertAccount,
     * or with status 400 (Bad Request) if the expertAccount is not valid,
     * or with status 500 (Internal Server Error) if the expertAccount couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/expert-accounts",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAccount> updateExpertAccount(@Valid @RequestBody ExpertAccount expertAccount) throws URISyntaxException {
        log.debug("REST request to update ExpertAccount : {}", expertAccount);
        if (expertAccount.getId() == null) {
            return createExpertAccount(expertAccount);
        }
        ExpertAccount result = expertAccountRepository.save(expertAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("expertAccount", expertAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expert-accounts : get all the expertAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertAccounts in body
     */
    @RequestMapping(value = "/expert-accounts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertAccount> getAllExpertAccounts() {
        log.debug("REST request to get all ExpertAccounts");
        List<ExpertAccount> expertAccounts = expertAccountRepository.findByUserIsCurrentUser(); //.findAll();
        return expertAccounts;
    }

    /**
     * GET  /expert-accounts/:id : get the "id" expertAccount.
     *
     * @param id the id of the expertAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expertAccount, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/expert-accounts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ExpertAccount> getExpertAccount(@PathVariable Long id) {
        log.debug("REST request to get ExpertAccount : {}", id);
        ExpertAccount expertAccount = expertAccountRepository.findOne(id);
        return Optional.ofNullable(expertAccount)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /expert-accounts/:id : delete the "id" expertAccount.
     *
     * @param id the id of the expertAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/expert-accounts/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteExpertAccount(@PathVariable Long id) {
        log.debug("REST request to delete ExpertAccount : {}", id);
        expertAccountRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("expertAccount", id.toString())).build();
    }

}
