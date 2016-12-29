package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.SpecialityExpertScore;
import com.dorsal.repository.SpecialityExpertScoreRepository;

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
 * Test class for the SpecialityExpertScoreResource REST controller.
 *
 * @see SpecialityExpertScoreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class SpecialityExpertScoreResourceIntTest {


    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Inject
    private SpecialityExpertScoreRepository specialityExpertScoreRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restSpecialityExpertScoreMockMvc;

    private SpecialityExpertScore specialityExpertScore;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SpecialityExpertScoreResource specialityExpertScoreResource = new SpecialityExpertScoreResource();
        ReflectionTestUtils.setField(specialityExpertScoreResource, "specialityExpertScoreRepository", specialityExpertScoreRepository);
        this.restSpecialityExpertScoreMockMvc = MockMvcBuilders.standaloneSetup(specialityExpertScoreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpecialityExpertScore createEntity(EntityManager em) {
        SpecialityExpertScore specialityExpertScore = new SpecialityExpertScore()
                .score(DEFAULT_SCORE);
        return specialityExpertScore;
    }

    @Before
    public void initTest() {
        specialityExpertScore = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpecialityExpertScore() throws Exception {
        int databaseSizeBeforeCreate = specialityExpertScoreRepository.findAll().size();

        // Create the SpecialityExpertScore

        restSpecialityExpertScoreMockMvc.perform(post("/api/speciality-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(specialityExpertScore)))
                .andExpect(status().isCreated());

        // Validate the SpecialityExpertScore in the database
        List<SpecialityExpertScore> specialityExpertScores = specialityExpertScoreRepository.findAll();
        assertThat(specialityExpertScores).hasSize(databaseSizeBeforeCreate + 1);
        SpecialityExpertScore testSpecialityExpertScore = specialityExpertScores.get(specialityExpertScores.size() - 1);
        assertThat(testSpecialityExpertScore.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void getAllSpecialityExpertScores() throws Exception {
        // Initialize the database
        specialityExpertScoreRepository.saveAndFlush(specialityExpertScore);

        // Get all the specialityExpertScores
        restSpecialityExpertScoreMockMvc.perform(get("/api/speciality-expert-scores?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(specialityExpertScore.getId().intValue())))
                .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }

    @Test
    @Transactional
    public void getSpecialityExpertScore() throws Exception {
        // Initialize the database
        specialityExpertScoreRepository.saveAndFlush(specialityExpertScore);

        // Get the specialityExpertScore
        restSpecialityExpertScoreMockMvc.perform(get("/api/speciality-expert-scores/{id}", specialityExpertScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(specialityExpertScore.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingSpecialityExpertScore() throws Exception {
        // Get the specialityExpertScore
        restSpecialityExpertScoreMockMvc.perform(get("/api/speciality-expert-scores/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpecialityExpertScore() throws Exception {
        // Initialize the database
        specialityExpertScoreRepository.saveAndFlush(specialityExpertScore);
        int databaseSizeBeforeUpdate = specialityExpertScoreRepository.findAll().size();

        // Update the specialityExpertScore
        SpecialityExpertScore updatedSpecialityExpertScore = specialityExpertScoreRepository.findOne(specialityExpertScore.getId());
        updatedSpecialityExpertScore
                .score(UPDATED_SCORE);

        restSpecialityExpertScoreMockMvc.perform(put("/api/speciality-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedSpecialityExpertScore)))
                .andExpect(status().isOk());

        // Validate the SpecialityExpertScore in the database
        List<SpecialityExpertScore> specialityExpertScores = specialityExpertScoreRepository.findAll();
        assertThat(specialityExpertScores).hasSize(databaseSizeBeforeUpdate);
        SpecialityExpertScore testSpecialityExpertScore = specialityExpertScores.get(specialityExpertScores.size() - 1);
        assertThat(testSpecialityExpertScore.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void deleteSpecialityExpertScore() throws Exception {
        // Initialize the database
        specialityExpertScoreRepository.saveAndFlush(specialityExpertScore);
        int databaseSizeBeforeDelete = specialityExpertScoreRepository.findAll().size();

        // Get the specialityExpertScore
        restSpecialityExpertScoreMockMvc.perform(delete("/api/speciality-expert-scores/{id}", specialityExpertScore.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<SpecialityExpertScore> specialityExpertScores = specialityExpertScoreRepository.findAll();
        assertThat(specialityExpertScores).hasSize(databaseSizeBeforeDelete - 1);
    }
}
