package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.JobRole;

import com.dorsal.repository.JobRoleRepository;
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
 * REST controller for managing JobRole.
 */
@RestController
@RequestMapping("/api")
public class JobRoleResource {

    private final Logger log = LoggerFactory.getLogger(JobRoleResource.class);
        
    @Inject
    private JobRoleRepository jobRoleRepository;

    /**
     * POST  /job-roles : Create a new jobRole.
     *
     * @param jobRole the jobRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobRole, or with status 400 (Bad Request) if the jobRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/job-roles",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobRole> createJobRole(@Valid @RequestBody JobRole jobRole) throws URISyntaxException {
        log.debug("REST request to save JobRole : {}", jobRole);
        if (jobRole.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("jobRole", "idexists", "A new jobRole cannot already have an ID")).body(null);
        }
        JobRole result = jobRoleRepository.save(jobRole);
        return ResponseEntity.created(new URI("/api/job-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("jobRole", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-roles : Updates an existing jobRole.
     *
     * @param jobRole the jobRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobRole,
     * or with status 400 (Bad Request) if the jobRole is not valid,
     * or with status 500 (Internal Server Error) if the jobRole couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/job-roles",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobRole> updateJobRole(@Valid @RequestBody JobRole jobRole) throws URISyntaxException {
        log.debug("REST request to update JobRole : {}", jobRole);
        if (jobRole.getId() == null) {
            return createJobRole(jobRole);
        }
        JobRole result = jobRoleRepository.save(jobRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("jobRole", jobRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-roles : get all the jobRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobRoles in body
     */
    @RequestMapping(value = "/job-roles",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<JobRole> getAllJobRoles() {
        log.debug("REST request to get all JobRoles");
        List<JobRole> jobRoles = jobRoleRepository.findAll();
        return jobRoles;
    }

    /**
     * GET  /job-roles/:id : get the "id" jobRole.
     *
     * @param id the id of the jobRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobRole, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/job-roles/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobRole> getJobRole(@PathVariable Long id) {
        log.debug("REST request to get JobRole : {}", id);
        JobRole jobRole = jobRoleRepository.findOne(id);
        return Optional.ofNullable(jobRole)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /job-roles/:id : delete the "id" jobRole.
     *
     * @param id the id of the jobRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/job-roles/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteJobRole(@PathVariable Long id) {
        log.debug("REST request to delete JobRole : {}", id);
        jobRoleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("jobRole", id.toString())).build();
    }

}
