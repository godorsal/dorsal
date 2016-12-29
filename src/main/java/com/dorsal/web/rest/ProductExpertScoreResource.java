package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.ProductExpertScore;

import com.dorsal.repository.ProductExpertScoreRepository;
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
 * REST controller for managing ProductExpertScore.
 */
@RestController
@RequestMapping("/api")
public class ProductExpertScoreResource {

    private final Logger log = LoggerFactory.getLogger(ProductExpertScoreResource.class);
        
    @Inject
    private ProductExpertScoreRepository productExpertScoreRepository;

    /**
     * POST  /product-expert-scores : Create a new productExpertScore.
     *
     * @param productExpertScore the productExpertScore to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productExpertScore, or with status 400 (Bad Request) if the productExpertScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/product-expert-scores",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ProductExpertScore> createProductExpertScore(@RequestBody ProductExpertScore productExpertScore) throws URISyntaxException {
        log.debug("REST request to save ProductExpertScore : {}", productExpertScore);
        if (productExpertScore.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("productExpertScore", "idexists", "A new productExpertScore cannot already have an ID")).body(null);
        }
        ProductExpertScore result = productExpertScoreRepository.save(productExpertScore);
        return ResponseEntity.created(new URI("/api/product-expert-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("productExpertScore", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-expert-scores : Updates an existing productExpertScore.
     *
     * @param productExpertScore the productExpertScore to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productExpertScore,
     * or with status 400 (Bad Request) if the productExpertScore is not valid,
     * or with status 500 (Internal Server Error) if the productExpertScore couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/product-expert-scores",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ProductExpertScore> updateProductExpertScore(@RequestBody ProductExpertScore productExpertScore) throws URISyntaxException {
        log.debug("REST request to update ProductExpertScore : {}", productExpertScore);
        if (productExpertScore.getId() == null) {
            return createProductExpertScore(productExpertScore);
        }
        ProductExpertScore result = productExpertScoreRepository.save(productExpertScore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("productExpertScore", productExpertScore.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-expert-scores : get all the productExpertScores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productExpertScores in body
     */
    @RequestMapping(value = "/product-expert-scores",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ProductExpertScore> getAllProductExpertScores() {
        log.debug("REST request to get all ProductExpertScores");
        List<ProductExpertScore> productExpertScores = productExpertScoreRepository.findAll();
        return productExpertScores;
    }

    /**
     * GET  /product-expert-scores/:id : get the "id" productExpertScore.
     *
     * @param id the id of the productExpertScore to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productExpertScore, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/product-expert-scores/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ProductExpertScore> getProductExpertScore(@PathVariable Long id) {
        log.debug("REST request to get ProductExpertScore : {}", id);
        ProductExpertScore productExpertScore = productExpertScoreRepository.findOne(id);
        return Optional.ofNullable(productExpertScore)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /product-expert-scores/:id : delete the "id" productExpertScore.
     *
     * @param id the id of the productExpertScore to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/product-expert-scores/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteProductExpertScore(@PathVariable Long id) {
        log.debug("REST request to delete ProductExpertScore : {}", id);
        productExpertScoreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("productExpertScore", id.toString())).build();
    }

}
