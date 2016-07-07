package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.SharedCase;
import com.dorsal.repository.SharedCaseRepository;

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
 * Test class for the SharedCaseResource REST controller.
 *
 * @see SharedCaseResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class SharedCaseResourceIntTest {


    @Inject
    private SharedCaseRepository sharedCaseRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restSharedCaseMockMvc;

    private SharedCase sharedCase;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SharedCaseResource sharedCaseResource = new SharedCaseResource();
        ReflectionTestUtils.setField(sharedCaseResource, "sharedCaseRepository", sharedCaseRepository);
        this.restSharedCaseMockMvc = MockMvcBuilders.standaloneSetup(sharedCaseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        sharedCase = new SharedCase();
    }

    @Test
    @Transactional
    public void createSharedCase() throws Exception {
        int databaseSizeBeforeCreate = sharedCaseRepository.findAll().size();

        // Create the SharedCase

        /*restSharedCaseMockMvc.perform(post("/api/shared-cases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(sharedCase)))
                .andExpect(status().isCreated());

        // Validate the SharedCase in the database
        List<SharedCase> sharedCases = sharedCaseRepository.findAll();
        assertThat(sharedCases).hasSize(databaseSizeBeforeCreate + 1);
        SharedCase testSharedCase = sharedCases.get(sharedCases.size() - 1);*/
    }

    @Test
    @Transactional
    public void getAllSharedCases() throws Exception {
        // Initialize the database
        sharedCaseRepository.saveAndFlush(sharedCase);

        // Get all the sharedCases
        restSharedCaseMockMvc.perform(get("/api/shared-cases?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(sharedCase.getId().intValue())));
    }

    @Test
    @Transactional
    public void getSharedCase() throws Exception {
        // Initialize the database
        sharedCaseRepository.saveAndFlush(sharedCase);

        // Get the sharedCase
        restSharedCaseMockMvc.perform(get("/api/shared-cases/{id}", sharedCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(sharedCase.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSharedCase() throws Exception {
        // Get the sharedCase
        restSharedCaseMockMvc.perform(get("/api/shared-cases/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSharedCase() throws Exception {
        // Initialize the database
        sharedCaseRepository.saveAndFlush(sharedCase);
        int databaseSizeBeforeUpdate = sharedCaseRepository.findAll().size();

        // Update the sharedCase
        SharedCase updatedSharedCase = new SharedCase();
        updatedSharedCase.setId(sharedCase.getId());

        restSharedCaseMockMvc.perform(put("/api/shared-cases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedSharedCase)))
                .andExpect(status().isOk());

        // Validate the SharedCase in the database
        List<SharedCase> sharedCases = sharedCaseRepository.findAll();
        assertThat(sharedCases).hasSize(databaseSizeBeforeUpdate);
        SharedCase testSharedCase = sharedCases.get(sharedCases.size() - 1);
    }

    @Test
    @Transactional
    public void deleteSharedCase() throws Exception {
        // Initialize the database
        sharedCaseRepository.saveAndFlush(sharedCase);
        int databaseSizeBeforeDelete = sharedCaseRepository.findAll().size();

        // Get the sharedCase
        restSharedCaseMockMvc.perform(delete("/api/shared-cases/{id}", sharedCase.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<SharedCase> sharedCases = sharedCaseRepository.findAll();
        assertThat(sharedCases).hasSize(databaseSizeBeforeDelete - 1);
    }
}
