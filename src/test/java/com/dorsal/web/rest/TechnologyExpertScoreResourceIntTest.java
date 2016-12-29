package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.TechnologyExpertScore;
import com.dorsal.repository.TechnologyExpertScoreRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TechnologyExpertScoreResource REST controller.
 *
 * @see TechnologyExpertScoreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class TechnologyExpertScoreResourceIntTest {


    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Inject
    private TechnologyExpertScoreRepository technologyExpertScoreRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restTechnologyExpertScoreMockMvc;

    private TechnologyExpertScore technologyExpertScore;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TechnologyExpertScoreResource technologyExpertScoreResource = new TechnologyExpertScoreResource();
        ReflectionTestUtils.setField(technologyExpertScoreResource, "technologyExpertScoreRepository", technologyExpertScoreRepository);
        this.restTechnologyExpertScoreMockMvc = MockMvcBuilders.standaloneSetup(technologyExpertScoreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TechnologyExpertScore createEntity(EntityManager em) {
        TechnologyExpertScore technologyExpertScore = new TechnologyExpertScore()
                .score(DEFAULT_SCORE);
        return technologyExpertScore;
    }

    @Before
    public void initTest() {
        technologyExpertScore = createEntity(em);
    }

    @Test
    @Transactional
    public void createTechnologyExpertScore() throws Exception {
        int databaseSizeBeforeCreate = technologyExpertScoreRepository.findAll().size();

        // Create the TechnologyExpertScore

        restTechnologyExpertScoreMockMvc.perform(post("/api/technology-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(technologyExpertScore)))
                .andExpect(status().isCreated());

        // Validate the TechnologyExpertScore in the database
        List<TechnologyExpertScore> technologyExpertScores = technologyExpertScoreRepository.findAll();
        assertThat(technologyExpertScores).hasSize(databaseSizeBeforeCreate + 1);
        TechnologyExpertScore testTechnologyExpertScore = technologyExpertScores.get(technologyExpertScores.size() - 1);
        assertThat(testTechnologyExpertScore.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void getAllTechnologyExpertScores() throws Exception {
        // Initialize the database
        technologyExpertScoreRepository.saveAndFlush(technologyExpertScore);

        // Get all the technologyExpertScores
        restTechnologyExpertScoreMockMvc.perform(get("/api/technology-expert-scores?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(technologyExpertScore.getId().intValue())))
                .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }

    @Test
    @Transactional
    public void getTechnologyExpertScore() throws Exception {
        // Initialize the database
        technologyExpertScoreRepository.saveAndFlush(technologyExpertScore);

        // Get the technologyExpertScore
        restTechnologyExpertScoreMockMvc.perform(get("/api/technology-expert-scores/{id}", technologyExpertScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(technologyExpertScore.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingTechnologyExpertScore() throws Exception {
        // Get the technologyExpertScore
        restTechnologyExpertScoreMockMvc.perform(get("/api/technology-expert-scores/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTechnologyExpertScore() throws Exception {
        // Initialize the database
        technologyExpertScoreRepository.saveAndFlush(technologyExpertScore);
        int databaseSizeBeforeUpdate = technologyExpertScoreRepository.findAll().size();

        // Update the technologyExpertScore
        TechnologyExpertScore updatedTechnologyExpertScore = technologyExpertScoreRepository.findOne(technologyExpertScore.getId());
        updatedTechnologyExpertScore
                .score(UPDATED_SCORE);

        restTechnologyExpertScoreMockMvc.perform(put("/api/technology-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedTechnologyExpertScore)))
                .andExpect(status().isOk());

        // Validate the TechnologyExpertScore in the database
        List<TechnologyExpertScore> technologyExpertScores = technologyExpertScoreRepository.findAll();
        assertThat(technologyExpertScores).hasSize(databaseSizeBeforeUpdate);
        TechnologyExpertScore testTechnologyExpertScore = technologyExpertScores.get(technologyExpertScores.size() - 1);
        assertThat(testTechnologyExpertScore.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void deleteTechnologyExpertScore() throws Exception {
        // Initialize the database
        technologyExpertScoreRepository.saveAndFlush(technologyExpertScore);
        int databaseSizeBeforeDelete = technologyExpertScoreRepository.findAll().size();

        // Get the technologyExpertScore
        restTechnologyExpertScoreMockMvc.perform(delete("/api/technology-expert-scores/{id}", technologyExpertScore.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<TechnologyExpertScore> technologyExpertScores = technologyExpertScoreRepository.findAll();
        assertThat(technologyExpertScores).hasSize(databaseSizeBeforeDelete - 1);
    }
}
