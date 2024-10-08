package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Rating;
import com.dorsal.domain.SupportCaseReport;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.RatingRepository;
import com.dorsal.repository.SupportCaseReportRepository;
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
 * REST controller for managing Rating.
 */
@RestController
@RequestMapping("/api")
public class RatingResource {

    private final Logger log = LoggerFactory.getLogger(RatingResource.class);

    @Inject
    private RatingRepository ratingRepository;

    @Inject
    private ExpertAccountRepository expertAccountRepository;

    @Inject
    private SupportCaseReportRepository supportCaseReportRepository;

    /**
     * POST  /ratings : Create a new rating.
     *
     * @param rating the rating to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rating, or with status 400 (Bad Request) if the rating has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/ratings",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rating> createRating(@Valid @RequestBody Rating rating) throws URISyntaxException {
        log.debug("REST request to save Rating : {}", rating);
        if (rating.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("rating", "idexists", "A new rating cannot already have an ID")).body(null);
        }

        // Adjust time
        rating.setDateRated(ZonedDateTime.now());

        Rating result = ratingRepository.save(rating);

        /* Create SupportCaseReport entry since case is rated and completed */
        try {

            SupportCaseReport reportEntry = new SupportCaseReport();
            reportEntry.setIsPaid(false);
            reportEntry.setSupportcase(rating.getSupportcase());
            reportEntry.setRating(rating);

            supportCaseReportRepository.save(reportEntry);
            log.info("SupportCaseReport record creation successful");
        } catch (Exception e) {
            log.error("SupportCaseReport record creation failed with error: " +e);
        }

        /* Update Expert Account with adjusted score */
        try {
            // Adjust Expert score
            ExpertAccount expert = rating.getSupportcase().getExpertaccount();

            /* Running average */
            int nbOfCases = expert.getNumberOfCases();
            int runningScore = expert.getExpertScore();
            log.info("Expert running score before case rating: " + runningScore + " for number of cases: " + nbOfCases);
            log.info("Expert rating for this case: " + rating.getScore() );

            nbOfCases++;
            runningScore = runningScore + rating.getScore();

            /* Adjusted average */
            log.info("Adjusted Expert average  " + (runningScore / nbOfCases) );

            log.info("Expert adjusted running score: " + runningScore + " for number of cases: " + nbOfCases);
            expert.setExpertScore(runningScore);
            expert.setNumberOfCases(nbOfCases);

            // Mark expert available again for taking in new cases.
            expert.setIsAvailable(true);

            expertAccountRepository.save(expert);
        } catch (Exception e) {
            log.error("Expert score update failed with error: " +e);
        }

        return ResponseEntity.created(new URI("/api/ratings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("rating", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ratings : Updates an existing rating.
     *
     * @param rating the rating to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rating,
     * or with status 400 (Bad Request) if the rating is not valid,
     * or with status 500 (Internal Server Error) if the rating couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/ratings",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rating> updateRating(@Valid @RequestBody Rating rating) throws URISyntaxException {
        log.debug("REST request to update Rating : {}", rating);
        if (rating.getId() == null) {
            return createRating(rating);
        }
        Rating result = ratingRepository.save(rating);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("rating", rating.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ratings : get all the ratings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ratings in body
     */
    @RequestMapping(value = "/ratings",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Rating> getAllRatings() {
        log.debug("REST request to get all Ratings");
        List<Rating> ratings = ratingRepository.findAll();
        return ratings;
    }

    /**
     * GET  /ratings/:id : get the "id" rating.
     *
     * @param id the id of the rating to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rating, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/ratings/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rating> getRating(@PathVariable Long id) {
        log.debug("REST request to get Rating : {}", id);
        Rating rating = ratingRepository.findOne(id);
        return Optional.ofNullable(rating)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * GET  /ratings/{supportcase:id} : get the rating for the supportcase "id".
     *
     * @param id the id of the supportcase for the rating to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rating, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/ratings/supportcase/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rating> getRatingBySupportcase(@PathVariable Long id) {
        log.debug("REST request to get Rating for supportcase: {}", id);
        Rating rating = ratingRepository.findRatingBySupportcaseID(id);
        return Optional.ofNullable(rating)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /ratings/:id : delete the "id" rating.
     *
     * @param id the id of the rating to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/ratings/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        log.debug("REST request to delete Rating : {}", id);
        ratingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("rating", id.toString())).build();
    }

}
