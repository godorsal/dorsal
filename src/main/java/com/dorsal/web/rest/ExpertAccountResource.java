package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.web.rest.util.HeaderUtil;
import com.dorsal.web.rest.util.QueryStringParser;
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
import java.util.*;

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

        // Debug
        /*log.warn("********** Test expert matching *************");
        List<String> productList = new ArrayList<String>();
        productList = Arrays.asList("MariaDB", "MySQL");

        List<ExpertAccount> experts = expertAccountRepository.findExpertByProducts(productList, 2);
        log.warn("Number of Experts " + experts.size() + " with score greater than 2 ");

        List<String> attributeList = new ArrayList<String>();
        attributeList = Arrays.asList("US-RESIDENT");

        experts = expertAccountRepository.findExpertByProductsAndAttribute(productList,2,attributeList);
        log.warn("Number of Experts " + experts.size() + " with score greater than 2 and US-RESIDENTS");
        for (int i=0; i < experts.size(); i++) {
            log.warn("Expert that matches: " + experts.get(i).getUser().getLogin());
        }

        String poolname = "Verizon";
        experts = expertAccountRepository.findExpertByProductsAndExpertPool(productList, 2,poolname.toLowerCase());
        log.warn("Number of Experts " + experts.size() + " with score greater than 2 and member of expertpool VERIZON");
        for (int i=0; i < experts.size(); i++) {
            log.warn("Expert that matches: " + experts.get(i).getUser().getLogin());
        }

        long qtime = System.currentTimeMillis();
        experts = expertAccountRepository.findExpertByProductsAndAttributesAndExpertPool(productList,2,attributeList,poolname.toLowerCase());
        log.warn("Number of Experts " + experts.size() + " with score greater than 2 and member of expertpool VERIZON and US-RESIDENT. Execution time: " + (System.currentTimeMillis() - qtime) + "ms");

        for (int i=0; i < experts.size(); i++) {
            log.warn("Expert that matches: " + experts.get(i).getUser().getLogin());
        }
        // Debug*/

        log.debug("REST request to get all ExpertAccounts");
        List<ExpertAccount> expertAccounts = expertAccountRepository.findByUserIsCurrentUser();
        return expertAccounts;
    }


    /**
     * GET  /expert-accounts/experts : get all the expertAccounts if the caller is an expert
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expertAccounts in body
     */
    @RequestMapping(value = "/expert-accounts/experts",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertAccount> getAllExpertAccountsForExpert() {
        log.debug("REST request to get all ExpertAccounts. Needs to be an expert to get it.");
        // Check if logged-in user is expert.
        if (expertAccountRepository.findByUserIsCurrentUser() != null) {
            List<ExpertAccount> expertAccounts = expertAccountRepository.findAll();
            return expertAccounts;
        } else {
            log.error("Request for all expert accounts from an un-authorized user.");
            return null;
        }
    }

    /**
     * Get experts for ExpertPool creation based on different criteria such as product and attributes
     *
     * A caller can pass in a list of products and a list of attributes and the minimum score as a query string
     * with the following format:
     *
     * /expert-accounts/query/product:MySQL,MariaDB:attribute:us-resident:score:2
     *
     */
    @RequestMapping(value = "/expert-accounts/query/{query}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ExpertAccount> getExpertsByQuery(@PathVariable String query) {
        log.debug("REST request to get ExpertAccounts by query");
        log.info("ExpertAccount query string: " + query);

        // Check if logged-in user is expert.
        if (expertAccountRepository.findByUserIsCurrentUser() != null) {

            // Parse out the query strings before calling into the API
            List<ExpertAccount> expertAccounts = null;
            List<String> productList = QueryStringParser.getProductListFromQuery(query);
            List<String> attributeList = QueryStringParser.getAttributeListFromQuery(query);
            int score = QueryStringParser.getScoreFromQuery(query);

            if (attributeList == null && productList == null) {
                // invalid query return a null set
                expertAccounts = null;
            } else if (attributeList == null || attributeList.size() == 0) {
                // No attributes defined search by products only
                expertAccounts = expertAccountRepository.findExpertByProductsList(productList, score);
            } else if (productList == null || productList.size() == 0) {
                // no products defined search by attributes only
                expertAccounts = expertAccountRepository.findExpertByAttribute(attributeList);
            } else {
                // Search by products and attributes
                expertAccounts = expertAccountRepository.findExpertByProductsAndAttributeLists(productList,score,attributeList);
            }

            // Return result set
            return expertAccounts;
        } else {
            log.error("Request for all expert accounts from an un-authorized user.");
            return null;
        }
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
