package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.SupportCaseReport;
import com.dorsal.domain.User;
import com.dorsal.repository.SupportCaseReportRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SupportCaseReport.
 */
@RestController
@RequestMapping("/api")
public class SupportCaseReportResource {

    private final Logger log = LoggerFactory.getLogger(SupportCaseReportResource.class);

    @Inject
    private SupportCaseReportRepository supportCaseReportRepository;

    @Inject
    private UserRepository userRepository;

    /**
     * POST  /support-case-reports : Create a new supportCaseReport.
     *
     * @param supportCaseReport the supportCaseReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supportCaseReport, or with status 400 (Bad Request) if the supportCaseReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/support-case-reports",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SupportCaseReport> createSupportCaseReport(@Valid @RequestBody SupportCaseReport supportCaseReport) throws URISyntaxException {
        log.debug("REST request to save SupportCaseReport : {}", supportCaseReport);

        // Creation of entry not allowed through API. It is done in the backend
        return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("supportCaseReport", "createnotallowed", "supportCaseReport entry cannot be created through the API")).body(null);

     /*if (supportCaseReport.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("supportCaseReport", "idexists", "A new supportCaseReport cannot already have an ID")).body(null);
        }
        SupportCaseReport result = supportCaseReportRepository.save(supportCaseReport);
        return ResponseEntity.created(new URI("/api/support-case-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("supportCaseReport", result.getId().toString()))
            .body(result);
     */
    }

    /**
     * PUT  /support-case-reports : Updates an existing supportCaseReport.
     *
     * @param supportCaseReport the supportCaseReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supportCaseReport,
     * or with status 400 (Bad Request) if the supportCaseReport is not valid,
     * or with status 500 (Internal Server Error) if the supportCaseReport couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/support-case-reports",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SupportCaseReport> updateSupportCaseReport(@Valid @RequestBody SupportCaseReport supportCaseReport) throws URISyntaxException {
        log.debug("REST request to update SupportCaseReport : {}", supportCaseReport);
        if (supportCaseReport.getId() == null) {
            return createSupportCaseReport(supportCaseReport);
        }
        // Only admin user can get report. Make sure the requester is admin before returning all records
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser != null && loggedInUser.getLogin().equalsIgnoreCase("admin")) {

            // Set date when flag is switched
            if (supportCaseReport.isIsPaid() )
                supportCaseReport.setDatePaid(ZonedDateTime.now());

            SupportCaseReport result = supportCaseReportRepository.save(supportCaseReport);
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("supportCaseReport", supportCaseReport.getId().toString()))
                .body(result);
        }
        else
        {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("supportCaseReport", "notallowed", "User is restricted to update resources")).body(null);

        }
    }

    /**
     * GET  /support-case-reports : get all the supportCaseReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supportCaseReports in body
     */
    @RequestMapping(value = "/support-case-reports",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<SupportCaseReport> getAllSupportCaseReports() {
        log.debug("REST request to get all SupportCaseReports");

        List<SupportCaseReport> supportCaseReports = null;

        // Only admin user can get report. Make sure the requester is admin before returning all records
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser != null && loggedInUser.getLogin().equalsIgnoreCase("admin")) {
            supportCaseReports = supportCaseReportRepository.findAll();
        }
        else
        {
            log.error("User not allowed to access API. No reports returned.");
            supportCaseReports = new ArrayList<SupportCaseReport>();
        }

        return supportCaseReports;
    }
    @RequestMapping(value = "/support-case-reports/query/{daysSince}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<SupportCaseReport> getAllSupportCaseReportsByQuery(@PathVariable String daysSince) {
        log.debug("REST request to get all SupportCaseReports");
        ZonedDateTime dateFrom = ZonedDateTime.parse(daysSince);

        List<SupportCaseReport> supportCaseReports = null;

        // Only admin user can get report. Make sure the requester is admin before returning all records
        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser != null && loggedInUser.getLogin().equalsIgnoreCase("admin")) {
            // supportCaseReports = supportCaseReportRepository.findAll();
            supportCaseReports = supportCaseReportRepository.findAllFromDaysAgo(dateFrom);

        }
        else
        {
            log.error("User not allowed to access API. No reports returned.");
            supportCaseReports = new ArrayList<SupportCaseReport>();
        }

        return supportCaseReports;
    }

    /**
     * GET  /support-case-reports/:id : get the "id" supportCaseReport.
     *
     * @param id the id of the supportCaseReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supportCaseReport, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/support-case-reports/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SupportCaseReport> getSupportCaseReport(@PathVariable Long id) {
        log.debug("REST request to get SupportCaseReport : {}", id);
        SupportCaseReport supportCaseReport = supportCaseReportRepository.findOne(id);
        return Optional.ofNullable(supportCaseReport)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /support-case-reports/:id : delete the "id" supportCaseReport.
     *
     * @param id the id of the supportCaseReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/support-case-reports/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSupportCaseReport(@PathVariable Long id) {
        log.debug("REST request to delete SupportCaseReport : {}", id);
        supportCaseReportRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("supportCaseReport", id.toString())).build();
    }

}
