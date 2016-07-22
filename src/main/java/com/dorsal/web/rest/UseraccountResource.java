package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Useraccount;
import com.dorsal.repository.UseraccountRepository;
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
 * REST controller for managing Useraccount.
 */
@RestController
@RequestMapping("/api")
public class UseraccountResource {

    private final Logger log = LoggerFactory.getLogger(UseraccountResource.class);

    @Inject
    private UseraccountRepository useraccountRepository;

    /**
     * POST  /useraccounts : Create a new useraccount.
     *
     * @param useraccount the useraccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new useraccount, or with status 400 (Bad Request) if the useraccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/useraccounts",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Useraccount> createUseraccount(@Valid @RequestBody Useraccount useraccount) throws URISyntaxException {
        log.debug("REST request to save Useraccount : {}", useraccount);
        if (useraccount.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("useraccount", "idexists", "A new useraccount cannot already have an ID")).body(null);
        }
        Useraccount result = useraccountRepository.save(useraccount);
        return ResponseEntity.created(new URI("/api/useraccounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("useraccount", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /useraccounts : Updates an existing useraccount.
     *
     * @param useraccount the useraccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated useraccount,
     * or with status 400 (Bad Request) if the useraccount is not valid,
     * or with status 500 (Internal Server Error) if the useraccount couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/useraccounts",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Useraccount> updateUseraccount(@Valid @RequestBody Useraccount useraccount) throws URISyntaxException {
        log.debug("REST request to update Useraccount : {}", useraccount);
        if (useraccount.getId() == null) {
            return createUseraccount(useraccount);
        }
        Useraccount result = useraccountRepository.save(useraccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("useraccount", useraccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /useraccounts : get all the useraccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of useraccounts in body
     */
    @RequestMapping(value = "/useraccounts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Useraccount> getAllUseraccounts() {
        log.debug("REST request to get all Useraccounts");
        List<Useraccount> useraccounts = useraccountRepository.findByUserIsCurrentUser();// .findAll();
        return useraccounts;
    }

    /**
     * GET  /useraccounts/:id : get the "id" useraccount.
     *
     * @param id the id of the useraccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the useraccount, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/useraccounts/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Useraccount> getUseraccount(@PathVariable Long id) {
        log.debug("REST request to get Useraccount : {}", id);
        Useraccount useraccount = useraccountRepository.findOne(id);
        return Optional.ofNullable(useraccount)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /useraccounts/:id : delete the "id" useraccount.
     *
     * @param id the id of the useraccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/useraccounts/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUseraccount(@PathVariable Long id) {
        log.debug("REST request to delete Useraccount : {}", id);
        useraccountRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("useraccount", id.toString())).build();
    }

}
