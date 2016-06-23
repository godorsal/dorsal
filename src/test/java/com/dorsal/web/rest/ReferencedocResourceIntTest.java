package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Referencedoc;
import com.dorsal.repository.ReferencedocRepository;

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
 * Test class for the ReferencedocResource REST controller.
 *
 * @see ReferencedocResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class ReferencedocResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_URL = "AAAAA";
    private static final String UPDATED_URL = "BBBBB";

    @Inject
    private ReferencedocRepository referencedocRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restReferencedocMockMvc;

    private Referencedoc referencedoc;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ReferencedocResource referencedocResource = new ReferencedocResource();
        ReflectionTestUtils.setField(referencedocResource, "referencedocRepository", referencedocRepository);
        this.restReferencedocMockMvc = MockMvcBuilders.standaloneSetup(referencedocResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        referencedoc = new Referencedoc();
        referencedoc.setName(DEFAULT_NAME);
        referencedoc.setUrl(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createReferencedoc() throws Exception {
        int databaseSizeBeforeCreate = referencedocRepository.findAll().size();

        // Create the Referencedoc

        restReferencedocMockMvc.perform(post("/api/referencedocs")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(referencedoc)))
                .andExpect(status().isCreated());

        // Validate the Referencedoc in the database
        List<Referencedoc> referencedocs = referencedocRepository.findAll();
        assertThat(referencedocs).hasSize(databaseSizeBeforeCreate + 1);
        Referencedoc testReferencedoc = referencedocs.get(referencedocs.size() - 1);
        assertThat(testReferencedoc.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReferencedoc.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void getAllReferencedocs() throws Exception {
        // Initialize the database
        referencedocRepository.saveAndFlush(referencedoc);

        // Get all the referencedocs
        restReferencedocMockMvc.perform(get("/api/referencedocs?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(referencedoc.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }

    @Test
    @Transactional
    public void getReferencedoc() throws Exception {
        // Initialize the database
        referencedocRepository.saveAndFlush(referencedoc);

        // Get the referencedoc
        restReferencedocMockMvc.perform(get("/api/referencedocs/{id}", referencedoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(referencedoc.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReferencedoc() throws Exception {
        // Get the referencedoc
        restReferencedocMockMvc.perform(get("/api/referencedocs/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReferencedoc() throws Exception {
        // Initialize the database
        referencedocRepository.saveAndFlush(referencedoc);
        int databaseSizeBeforeUpdate = referencedocRepository.findAll().size();

        // Update the referencedoc
        Referencedoc updatedReferencedoc = new Referencedoc();
        updatedReferencedoc.setId(referencedoc.getId());
        updatedReferencedoc.setName(UPDATED_NAME);
        updatedReferencedoc.setUrl(UPDATED_URL);

        restReferencedocMockMvc.perform(put("/api/referencedocs")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedReferencedoc)))
                .andExpect(status().isOk());

        // Validate the Referencedoc in the database
        List<Referencedoc> referencedocs = referencedocRepository.findAll();
        assertThat(referencedocs).hasSize(databaseSizeBeforeUpdate);
        Referencedoc testReferencedoc = referencedocs.get(referencedocs.size() - 1);
        assertThat(testReferencedoc.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReferencedoc.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void deleteReferencedoc() throws Exception {
        // Initialize the database
        referencedocRepository.saveAndFlush(referencedoc);
        int databaseSizeBeforeDelete = referencedocRepository.findAll().size();

        // Get the referencedoc
        restReferencedocMockMvc.perform(delete("/api/referencedocs/{id}", referencedoc.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Referencedoc> referencedocs = referencedocRepository.findAll();
        assertThat(referencedocs).hasSize(databaseSizeBeforeDelete - 1);
    }
}
