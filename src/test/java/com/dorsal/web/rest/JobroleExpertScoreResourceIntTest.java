package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.JobroleExpertScore;
import com.dorsal.repository.JobroleExpertScoreRepository;

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
 * Test class for the JobroleExpertScoreResource REST controller.
 *
 * @see JobroleExpertScoreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class JobroleExpertScoreResourceIntTest {


    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Inject
    private JobroleExpertScoreRepository jobroleExpertScoreRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restJobroleExpertScoreMockMvc;

    private JobroleExpertScore jobroleExpertScore;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        JobroleExpertScoreResource jobroleExpertScoreResource = new JobroleExpertScoreResource();
        ReflectionTestUtils.setField(jobroleExpertScoreResource, "jobroleExpertScoreRepository", jobroleExpertScoreRepository);
        this.restJobroleExpertScoreMockMvc = MockMvcBuilders.standaloneSetup(jobroleExpertScoreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobroleExpertScore createEntity(EntityManager em) {
        JobroleExpertScore jobroleExpertScore = new JobroleExpertScore()
                .score(DEFAULT_SCORE);
        return jobroleExpertScore;
    }

    @Before
    public void initTest() {
        jobroleExpertScore = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobroleExpertScore() throws Exception {
        int databaseSizeBeforeCreate = jobroleExpertScoreRepository.findAll().size();

        // Create the JobroleExpertScore

        restJobroleExpertScoreMockMvc.perform(post("/api/jobrole-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(jobroleExpertScore)))
                .andExpect(status().isCreated());

        // Validate the JobroleExpertScore in the database
        List<JobroleExpertScore> jobroleExpertScores = jobroleExpertScoreRepository.findAll();
        assertThat(jobroleExpertScores).hasSize(databaseSizeBeforeCreate + 1);
        JobroleExpertScore testJobroleExpertScore = jobroleExpertScores.get(jobroleExpertScores.size() - 1);
        assertThat(testJobroleExpertScore.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void getAllJobroleExpertScores() throws Exception {
        // Initialize the database
        jobroleExpertScoreRepository.saveAndFlush(jobroleExpertScore);

        // Get all the jobroleExpertScores
        restJobroleExpertScoreMockMvc.perform(get("/api/jobrole-expert-scores?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(jobroleExpertScore.getId().intValue())))
                .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }

    @Test
    @Transactional
    public void getJobroleExpertScore() throws Exception {
        // Initialize the database
        jobroleExpertScoreRepository.saveAndFlush(jobroleExpertScore);

        // Get the jobroleExpertScore
        restJobroleExpertScoreMockMvc.perform(get("/api/jobrole-expert-scores/{id}", jobroleExpertScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobroleExpertScore.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingJobroleExpertScore() throws Exception {
        // Get the jobroleExpertScore
        restJobroleExpertScoreMockMvc.perform(get("/api/jobrole-expert-scores/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobroleExpertScore() throws Exception {
        // Initialize the database
        jobroleExpertScoreRepository.saveAndFlush(jobroleExpertScore);
        int databaseSizeBeforeUpdate = jobroleExpertScoreRepository.findAll().size();

        // Update the jobroleExpertScore
        JobroleExpertScore updatedJobroleExpertScore = jobroleExpertScoreRepository.findOne(jobroleExpertScore.getId());
        updatedJobroleExpertScore
                .score(UPDATED_SCORE);

        restJobroleExpertScoreMockMvc.perform(put("/api/jobrole-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedJobroleExpertScore)))
                .andExpect(status().isOk());

        // Validate the JobroleExpertScore in the database
        List<JobroleExpertScore> jobroleExpertScores = jobroleExpertScoreRepository.findAll();
        assertThat(jobroleExpertScores).hasSize(databaseSizeBeforeUpdate);
        JobroleExpertScore testJobroleExpertScore = jobroleExpertScores.get(jobroleExpertScores.size() - 1);
        assertThat(testJobroleExpertScore.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void deleteJobroleExpertScore() throws Exception {
        // Initialize the database
        jobroleExpertScoreRepository.saveAndFlush(jobroleExpertScore);
        int databaseSizeBeforeDelete = jobroleExpertScoreRepository.findAll().size();

        // Get the jobroleExpertScore
        restJobroleExpertScoreMockMvc.perform(delete("/api/jobrole-expert-scores/{id}", jobroleExpertScore.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<JobroleExpertScore> jobroleExpertScores = jobroleExpertScoreRepository.findAll();
        assertThat(jobroleExpertScores).hasSize(databaseSizeBeforeDelete - 1);
    }
}
