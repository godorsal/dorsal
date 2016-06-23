package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Expertbadge;
import com.dorsal.repository.ExpertbadgeRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the ExpertbadgeResource REST controller.
 *
 * @see ExpertbadgeResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class ExpertbadgeResourceIntTest {


    @Inject
    private ExpertbadgeRepository expertbadgeRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restExpertbadgeMockMvc;

    private Expertbadge expertbadge;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExpertbadgeResource expertbadgeResource = new ExpertbadgeResource();
        ReflectionTestUtils.setField(expertbadgeResource, "expertbadgeRepository", expertbadgeRepository);
        this.restExpertbadgeMockMvc = MockMvcBuilders.standaloneSetup(expertbadgeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        expertbadge = new Expertbadge();
    }

    @Test
    @Transactional
    public void createExpertbadge() throws Exception {
        int databaseSizeBeforeCreate = expertbadgeRepository.findAll().size();

        // Create the Expertbadge

        restExpertbadgeMockMvc.perform(post("/api/expertbadges")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertbadge)))
                .andExpect(status().isCreated());

        // Validate the Expertbadge in the database
        List<Expertbadge> expertbadges = expertbadgeRepository.findAll();
        assertThat(expertbadges).hasSize(databaseSizeBeforeCreate + 1);
        Expertbadge testExpertbadge = expertbadges.get(expertbadges.size() - 1);
    }

    @Test
    @Transactional
    public void getAllExpertbadges() throws Exception {
        // Initialize the database
        expertbadgeRepository.saveAndFlush(expertbadge);

        // Get all the expertbadges
        restExpertbadgeMockMvc.perform(get("/api/expertbadges?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(expertbadge.getId().intValue())));
    }

    @Test
    @Transactional
    public void getExpertbadge() throws Exception {
        // Initialize the database
        expertbadgeRepository.saveAndFlush(expertbadge);

        // Get the expertbadge
        restExpertbadgeMockMvc.perform(get("/api/expertbadges/{id}", expertbadge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(expertbadge.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExpertbadge() throws Exception {
        // Get the expertbadge
        restExpertbadgeMockMvc.perform(get("/api/expertbadges/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpertbadge() throws Exception {
        // Initialize the database
        expertbadgeRepository.saveAndFlush(expertbadge);
        int databaseSizeBeforeUpdate = expertbadgeRepository.findAll().size();

        // Update the expertbadge
        Expertbadge updatedExpertbadge = new Expertbadge();
        updatedExpertbadge.setId(expertbadge.getId());

        restExpertbadgeMockMvc.perform(put("/api/expertbadges")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedExpertbadge)))
                .andExpect(status().isOk());

        // Validate the Expertbadge in the database
        List<Expertbadge> expertbadges = expertbadgeRepository.findAll();
        assertThat(expertbadges).hasSize(databaseSizeBeforeUpdate);
        Expertbadge testExpertbadge = expertbadges.get(expertbadges.size() - 1);
    }

    @Test
    @Transactional
    public void deleteExpertbadge() throws Exception {
        // Initialize the database
        expertbadgeRepository.saveAndFlush(expertbadge);
        int databaseSizeBeforeDelete = expertbadgeRepository.findAll().size();

        // Get the expertbadge
        restExpertbadgeMockMvc.perform(delete("/api/expertbadges/{id}", expertbadge.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Expertbadge> expertbadges = expertbadgeRepository.findAll();
        assertThat(expertbadges).hasSize(databaseSizeBeforeDelete - 1);
    }
}
