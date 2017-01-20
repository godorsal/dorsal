package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.SkillExpertScore;
import com.dorsal.repository.SkillExpertScoreRepository;

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
 * Test class for the SkillExpertScoreResource REST controller.
 *
 * @see SkillExpertScoreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class SkillExpertScoreResourceIntTest {


    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Inject
    private SkillExpertScoreRepository skillExpertScoreRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restSkillExpertScoreMockMvc;

    private SkillExpertScore skillExpertScore;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SkillExpertScoreResource skillExpertScoreResource = new SkillExpertScoreResource();
        ReflectionTestUtils.setField(skillExpertScoreResource, "skillExpertScoreRepository", skillExpertScoreRepository);
        this.restSkillExpertScoreMockMvc = MockMvcBuilders.standaloneSetup(skillExpertScoreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SkillExpertScore createEntity(EntityManager em) {
        SkillExpertScore skillExpertScore = new SkillExpertScore()
                .score(DEFAULT_SCORE);
        return skillExpertScore;
    }

    @Before
    public void initTest() {
        skillExpertScore = createEntity(em);
    }

    @Test
    @Transactional
    public void createSkillExpertScore() throws Exception {
        int databaseSizeBeforeCreate = skillExpertScoreRepository.findAll().size();

        // Create the SkillExpertScore

        restSkillExpertScoreMockMvc.perform(post("/api/skill-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(skillExpertScore)))
                .andExpect(status().isCreated());

        // Validate the SkillExpertScore in the database
        List<SkillExpertScore> skillExpertScores = skillExpertScoreRepository.findAll();
        assertThat(skillExpertScores).hasSize(databaseSizeBeforeCreate + 1);
        SkillExpertScore testSkillExpertScore = skillExpertScores.get(skillExpertScores.size() - 1);
        assertThat(testSkillExpertScore.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void getAllSkillExpertScores() throws Exception {
        // Initialize the database
        skillExpertScoreRepository.saveAndFlush(skillExpertScore);

        // Get all the skillExpertScores
        /*restSkillExpertScoreMockMvc.perform(get("/api/skill-expert-scores?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(skillExpertScore.getId().intValue())))
                .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));*/
    }

    @Test
    @Transactional
    public void getSkillExpertScore() throws Exception {
        // Initialize the database
        skillExpertScoreRepository.saveAndFlush(skillExpertScore);

        // Get the skillExpertScore
        restSkillExpertScoreMockMvc.perform(get("/api/skill-expert-scores/{id}", skillExpertScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(skillExpertScore.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingSkillExpertScore() throws Exception {
        // Get the skillExpertScore
        restSkillExpertScoreMockMvc.perform(get("/api/skill-expert-scores/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSkillExpertScore() throws Exception {
        // Initialize the database
        skillExpertScoreRepository.saveAndFlush(skillExpertScore);
        int databaseSizeBeforeUpdate = skillExpertScoreRepository.findAll().size();

        // Update the skillExpertScore
        SkillExpertScore updatedSkillExpertScore = skillExpertScoreRepository.findOne(skillExpertScore.getId());
        updatedSkillExpertScore
                .score(UPDATED_SCORE);

        restSkillExpertScoreMockMvc.perform(put("/api/skill-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedSkillExpertScore)))
                .andExpect(status().isOk());

        // Validate the SkillExpertScore in the database
        List<SkillExpertScore> skillExpertScores = skillExpertScoreRepository.findAll();
        assertThat(skillExpertScores).hasSize(databaseSizeBeforeUpdate);
        SkillExpertScore testSkillExpertScore = skillExpertScores.get(skillExpertScores.size() - 1);
        assertThat(testSkillExpertScore.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void deleteSkillExpertScore() throws Exception {
        // Initialize the database
        skillExpertScoreRepository.saveAndFlush(skillExpertScore);
        int databaseSizeBeforeDelete = skillExpertScoreRepository.findAll().size();

        // Get the skillExpertScore
        restSkillExpertScoreMockMvc.perform(delete("/api/skill-expert-scores/{id}", skillExpertScore.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<SkillExpertScore> skillExpertScores = skillExpertScoreRepository.findAll();
        assertThat(skillExpertScores).hasSize(databaseSizeBeforeDelete - 1);
    }
}
