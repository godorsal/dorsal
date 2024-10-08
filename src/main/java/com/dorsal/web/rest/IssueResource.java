package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Issue;
import com.dorsal.domain.User;
import com.dorsal.repository.IssueRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Issue.
 */
@RestController
@RequestMapping("/api")
public class IssueResource {

    private final Logger log = LoggerFactory.getLogger(IssueResource.class);

    @Inject
    private IssueRepository issueRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    /**
     * POST  /issues : Create a new issue.
     *
     * @param issue the issue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new issue, or with status 400 (Bad Request) if the issue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/issues",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Issue> createIssue(@Valid @RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to save Issue : {}", issue);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("Issue Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("issue", "accessrefused", "No permissions for this operations")).body(null);
        }

        if (issue.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("issue", "idexists", "A new issue cannot already have an ID")).body(null);
        }
        Issue result = issueRepository.save(issue);
        return ResponseEntity.created(new URI("/api/issues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("issue", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /issues : Updates an existing issue.
     *
     * @param issue the issue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated issue,
     * or with status 400 (Bad Request) if the issue is not valid,
     * or with status 500 (Internal Server Error) if the issue couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/issues",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Issue> updateIssue(@Valid @RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to update Issue : {}", issue);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("Issue Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("issue", "accessrefused", "No permissions for this operations")).body(null);
        }
        if (issue.getId() == null) {
            return createIssue(issue);
        }
        Issue result = issueRepository.save(issue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("issue", issue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /issues : get all the issues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of issues in body
     */
    @RequestMapping(value = "/issues",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Issue> getAllIssues() {
        log.debug("REST request to get all Issues");
        List<Issue> issues = issueRepository.findAll();
        return issues;
    }

    /**
     * GET  /issues/:id : get the "id" issue.
     *
     * @param id the id of the issue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the issue, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/issues/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Issue> getIssue(@PathVariable Long id) {
        log.debug("REST request to get Issue : {}", id);
        Issue issue = issueRepository.findOne(id);
        return Optional.ofNullable(issue)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /issues/:id : delete the "id" issue.
     *
     * @param id the id of the issue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/issues/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        log.debug("REST request to delete Issue : {}", id);
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("Issue Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("issue", "accessrefused", "No permissions for this operations")).body(null);
        }
        issueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("issue", id.toString())).build();
    }

}
