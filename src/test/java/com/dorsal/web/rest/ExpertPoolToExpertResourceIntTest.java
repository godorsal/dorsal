package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.ExpertPoolToExpert;
import com.dorsal.repository.ExpertPoolToExpertRepository;

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
 * Test class for the ExpertPoolToExpertResource REST controller.
 *
 * @see ExpertPoolToExpertResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class ExpertPoolToExpertResourceIntTest {


    @Inject
    private ExpertPoolToExpertRepository expertPoolToExpertRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restExpertPoolToExpertMockMvc;

    private ExpertPoolToExpert expertPoolToExpert;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExpertPoolToExpertResource expertPoolToExpertResource = new ExpertPoolToExpertResource();
        ReflectionTestUtils.setField(expertPoolToExpertResource, "expertPoolToExpertRepository", expertPoolToExpertRepository);
        this.restExpertPoolToExpertMockMvc = MockMvcBuilders.standaloneSetup(expertPoolToExpertResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExpertPoolToExpert createEntity(EntityManager em) {
        ExpertPoolToExpert expertPoolToExpert = new ExpertPoolToExpert();
        return expertPoolToExpert;
    }

    @Before
    public void initTest() {
        expertPoolToExpert = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpertPoolToExpert() throws Exception {
        int databaseSizeBeforeCreate = expertPoolToExpertRepository.findAll().size();

        // Create the ExpertPoolToExpert

        restExpertPoolToExpertMockMvc.perform(post("/api/expert-pool-to-experts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertPoolToExpert)))
                .andExpect(status().isCreated());

        // Validate the ExpertPoolToExpert in the database
        List<ExpertPoolToExpert> expertPoolToExperts = expertPoolToExpertRepository.findAll();
        assertThat(expertPoolToExperts).hasSize(databaseSizeBeforeCreate + 1);
        ExpertPoolToExpert testExpertPoolToExpert = expertPoolToExperts.get(expertPoolToExperts.size() - 1);
    }

    @Test
    @Transactional
    public void getAllExpertPoolToExperts() throws Exception {
        // Initialize the database
        expertPoolToExpertRepository.saveAndFlush(expertPoolToExpert);

        // Get all the expertPoolToExperts
        restExpertPoolToExpertMockMvc.perform(get("/api/expert-pool-to-experts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(expertPoolToExpert.getId().intValue())));
    }

    @Test
    @Transactional
    public void getExpertPoolToExpert() throws Exception {
        // Initialize the database
        expertPoolToExpertRepository.saveAndFlush(expertPoolToExpert);

        // Get the expertPoolToExpert
        restExpertPoolToExpertMockMvc.perform(get("/api/expert-pool-to-experts/{id}", expertPoolToExpert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expertPoolToExpert.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExpertPoolToExpert() throws Exception {
        // Get the expertPoolToExpert
        restExpertPoolToExpertMockMvc.perform(get("/api/expert-pool-to-experts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpertPoolToExpert() throws Exception {
        // Initialize the database
        expertPoolToExpertRepository.saveAndFlush(expertPoolToExpert);
        int databaseSizeBeforeUpdate = expertPoolToExpertRepository.findAll().size();

        // Update the expertPoolToExpert
        ExpertPoolToExpert updatedExpertPoolToExpert = expertPoolToExpertRepository.findOne(expertPoolToExpert.getId());

        restExpertPoolToExpertMockMvc.perform(put("/api/expert-pool-to-experts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedExpertPoolToExpert)))
                .andExpect(status().isOk());

        // Validate the ExpertPoolToExpert in the database
        List<ExpertPoolToExpert> expertPoolToExperts = expertPoolToExpertRepository.findAll();
        assertThat(expertPoolToExperts).hasSize(databaseSizeBeforeUpdate);
        ExpertPoolToExpert testExpertPoolToExpert = expertPoolToExperts.get(expertPoolToExperts.size() - 1);
    }

    @Test
    @Transactional
    public void deleteExpertPoolToExpert() throws Exception {
        // Initialize the database
        expertPoolToExpertRepository.saveAndFlush(expertPoolToExpert);
        int databaseSizeBeforeDelete = expertPoolToExpertRepository.findAll().size();

        // Get the expertPoolToExpert
        restExpertPoolToExpertMockMvc.perform(delete("/api/expert-pool-to-experts/{id}", expertPoolToExpert.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpertPoolToExpert> expertPoolToExperts = expertPoolToExpertRepository.findAll();
        assertThat(expertPoolToExperts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
