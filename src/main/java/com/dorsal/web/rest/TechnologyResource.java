package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Technology;
import com.dorsal.domain.User;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.TechnologyRepository;
import com.dorsal.repository.UserRepository;
import com.dorsal.service.TechnologyService;
import com.dorsal.web.rest.util.HeaderUtil;
import com.dorsal.web.rest.dto.TechnologyDTO;
import com.dorsal.web.rest.mapper.TechnologyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.expression.spel.SpelEvaluationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Technology.
 */
@RestController
@RequestMapping("/api")
public class TechnologyResource {

    private final Logger log = LoggerFactory.getLogger(TechnologyResource.class);

    @Inject
    private TechnologyService technologyService;

    @Inject
    private TechnologyMapper technologyMapper;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    @Inject
    private ExpertAccountRepository expertAccountRepository;

    /**
     * POST  /technologies : Create a new technology.
     *
     * @param technologyDTO the technologyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new technologyDTO, or with status 400 (Bad Request) if the technology has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technologies",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TechnologyDTO> createTechnology(@Valid @RequestBody TechnologyDTO technologyDTO) throws URISyntaxException {
        log.debug("REST request to save Technology : {}", technologyDTO);

        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("Technology Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technology", "accessrefused", "No permissions for this operations")).body(null);
        }

        if (technologyDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technology", "idexists", "A new technology cannot already have an ID")).body(null);
        }
        TechnologyDTO result = technologyService.save(technologyDTO);
        return ResponseEntity.created(new URI("/api/technologies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("technology", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /technologies : Updates an existing technology.
     *
     * @param technologyDTO the technologyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated technologyDTO,
     * or with status 400 (Bad Request) if the technologyDTO is not valid,
     * or with status 500 (Internal Server Error) if the technologyDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/technologies",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TechnologyDTO> updateTechnology(@Valid @RequestBody TechnologyDTO technologyDTO) throws URISyntaxException {
        log.debug("REST request to update Technology : {}", technologyDTO);

        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("Technology Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technology", "accessrefused", "No permissions for this operations")).body(null);
        }

        if (technologyDTO.getId() == null) {
            return createTechnology(technologyDTO);
        }
        TechnologyDTO result = technologyService.save(technologyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("technology", technologyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /technologies : get all the technologies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of technologies in body
     */
    @RequestMapping(value = "/technologies",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public List<TechnologyDTO> getAllTechnologies() {
        log.debug("REST request to get all Technologies");
        /**
         * The entity is used to store the technologies for the intake (case create page) and for the expert profiles added
         * with version 1.2
         * To facilitate both functionality the lower range (id 1-9) is used for intake (regular user login) while
         * id 10 and higher are for the expert profiles
         */
        try {
            if (expertAccountRepository.findByUserIsCurrentUser().size() > 0) {
                log.info("Technology query for Expert profiles ...");
                return technologyService.findExpertProfileEntries();
            } else {
                log.info("Technology query for intake - case create page ...");
                return technologyService.findUserIntakeList();
            }
        } catch (SpelEvaluationException evale) {
            log.debug("User not logged in. restricted access to technology table. ");
            log.debug("Technology query for intake - case create page ...");
            return technologyService.findUserIntakeList();
        }
    }

    /**
     * GET  /technologies/:id : get the "id" technology.
     *
     * @param id the id of the technologyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the technologyDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/technologies/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TechnologyDTO> getTechnology(@PathVariable Long id) {
        log.debug("REST request to get Technology : {}", id);
        TechnologyDTO technologyDTO = technologyService.findOne(id);
        return Optional.ofNullable(technologyDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /technologies/:id : delete the "id" technology.
     *
     * @param id the id of the technologyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/technologies/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTechnology(@PathVariable Long id) {
        log.debug("REST request to delete Technology : {}", id);

        User loggedInUser = userRepository.findLoggedInUser();
        if (loggedInUser == null) {
            log.warn("Technology Entity: Creation attempted without being logged into system");
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("technology", "accessrefused", "No permissions for this operations")).body(null);
        }

        technologyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("technology", id.toString())).build();
    }

}
