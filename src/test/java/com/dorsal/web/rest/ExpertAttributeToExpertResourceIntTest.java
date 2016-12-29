package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.ExpertAttributeToExpert;
import com.dorsal.repository.ExpertAttributeToExpertRepository;

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
 * Test class for the ExpertAttributeToExpertResource REST controller.
 *
 * @see ExpertAttributeToExpertResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class ExpertAttributeToExpertResourceIntTest {


    @Inject
    private ExpertAttributeToExpertRepository expertAttributeToExpertRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restExpertAttributeToExpertMockMvc;

    private ExpertAttributeToExpert expertAttributeToExpert;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExpertAttributeToExpertResource expertAttributeToExpertResource = new ExpertAttributeToExpertResource();
        ReflectionTestUtils.setField(expertAttributeToExpertResource, "expertAttributeToExpertRepository", expertAttributeToExpertRepository);
        this.restExpertAttributeToExpertMockMvc = MockMvcBuilders.standaloneSetup(expertAttributeToExpertResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExpertAttributeToExpert createEntity(EntityManager em) {
        ExpertAttributeToExpert expertAttributeToExpert = new ExpertAttributeToExpert();
        return expertAttributeToExpert;
    }

    @Before
    public void initTest() {
        expertAttributeToExpert = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpertAttributeToExpert() throws Exception {
        int databaseSizeBeforeCreate = expertAttributeToExpertRepository.findAll().size();

        // Create the ExpertAttributeToExpert

        /*restExpertAttributeToExpertMockMvc.perform(post("/api/expert-attribute-to-experts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertAttributeToExpert)))
                .andExpect(status().isCreated());

        // Validate the ExpertAttributeToExpert in the database
        List<ExpertAttributeToExpert> expertAttributeToExperts = expertAttributeToExpertRepository.findAll();
        assertThat(expertAttributeToExperts).hasSize(databaseSizeBeforeCreate + 1);
        ExpertAttributeToExpert testExpertAttributeToExpert = expertAttributeToExperts.get(expertAttributeToExperts.size() - 1);*/
    }

    @Test
    @Transactional
    public void getAllExpertAttributeToExperts() throws Exception {
        // Initialize the database
        expertAttributeToExpertRepository.saveAndFlush(expertAttributeToExpert);

        // Get all the expertAttributeToExperts
        restExpertAttributeToExpertMockMvc.perform(get("/api/expert-attribute-to-experts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(expertAttributeToExpert.getId().intValue())));
    }

    @Test
    @Transactional
    public void getExpertAttributeToExpert() throws Exception {
        // Initialize the database
        expertAttributeToExpertRepository.saveAndFlush(expertAttributeToExpert);

        // Get the expertAttributeToExpert
        restExpertAttributeToExpertMockMvc.perform(get("/api/expert-attribute-to-experts/{id}", expertAttributeToExpert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expertAttributeToExpert.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExpertAttributeToExpert() throws Exception {
        // Get the expertAttributeToExpert
        restExpertAttributeToExpertMockMvc.perform(get("/api/expert-attribute-to-experts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpertAttributeToExpert() throws Exception {
        // Initialize the database
        expertAttributeToExpertRepository.saveAndFlush(expertAttributeToExpert);
        int databaseSizeBeforeUpdate = expertAttributeToExpertRepository.findAll().size();

        // Update the expertAttributeToExpert
        ExpertAttributeToExpert updatedExpertAttributeToExpert = expertAttributeToExpertRepository.findOne(expertAttributeToExpert.getId());

        restExpertAttributeToExpertMockMvc.perform(put("/api/expert-attribute-to-experts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedExpertAttributeToExpert)))
                .andExpect(status().isOk());

        // Validate the ExpertAttributeToExpert in the database
        List<ExpertAttributeToExpert> expertAttributeToExperts = expertAttributeToExpertRepository.findAll();
        assertThat(expertAttributeToExperts).hasSize(databaseSizeBeforeUpdate);
        ExpertAttributeToExpert testExpertAttributeToExpert = expertAttributeToExperts.get(expertAttributeToExperts.size() - 1);
    }

    @Test
    @Transactional
    public void deleteExpertAttributeToExpert() throws Exception {
        // Initialize the database
        expertAttributeToExpertRepository.saveAndFlush(expertAttributeToExpert);
        int databaseSizeBeforeDelete = expertAttributeToExpertRepository.findAll().size();

        // Get the expertAttributeToExpert
        restExpertAttributeToExpertMockMvc.perform(delete("/api/expert-attribute-to-experts/{id}", expertAttributeToExpert.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpertAttributeToExpert> expertAttributeToExperts = expertAttributeToExpertRepository.findAll();
        assertThat(expertAttributeToExperts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
