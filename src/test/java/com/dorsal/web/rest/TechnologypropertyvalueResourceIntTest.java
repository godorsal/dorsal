package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Technologypropertyvalue;
import com.dorsal.repository.TechnologypropertyvalueRepository;

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
 * Test class for the TechnologypropertyvalueResource REST controller.
 *
 * @see TechnologypropertyvalueResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class TechnologypropertyvalueResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAA";
    private static final String UPDATED_VALUE = "BBBBB";

    @Inject
    private TechnologypropertyvalueRepository technologypropertyvalueRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restTechnologypropertyvalueMockMvc;

    private Technologypropertyvalue technologypropertyvalue;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TechnologypropertyvalueResource technologypropertyvalueResource = new TechnologypropertyvalueResource();
        ReflectionTestUtils.setField(technologypropertyvalueResource, "technologypropertyvalueRepository", technologypropertyvalueRepository);
        this.restTechnologypropertyvalueMockMvc = MockMvcBuilders.standaloneSetup(technologypropertyvalueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        technologypropertyvalue = new Technologypropertyvalue();
        technologypropertyvalue.setValue(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createTechnologypropertyvalue() throws Exception {
        int databaseSizeBeforeCreate = technologypropertyvalueRepository.findAll().size();

        // Create the Technologypropertyvalue

        restTechnologypropertyvalueMockMvc.perform(post("/api/technologypropertyvalues")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(technologypropertyvalue)))
                .andExpect(status().isCreated());

        // Validate the Technologypropertyvalue in the database
        List<Technologypropertyvalue> technologypropertyvalues = technologypropertyvalueRepository.findAll();
        assertThat(technologypropertyvalues).hasSize(databaseSizeBeforeCreate + 1);
        Technologypropertyvalue testTechnologypropertyvalue = technologypropertyvalues.get(technologypropertyvalues.size() - 1);
        assertThat(testTechnologypropertyvalue.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void getAllTechnologypropertyvalues() throws Exception {
        // Initialize the database
        technologypropertyvalueRepository.saveAndFlush(technologypropertyvalue);

        // Get all the technologypropertyvalues
        restTechnologypropertyvalueMockMvc.perform(get("/api/technologypropertyvalues?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(technologypropertyvalue.getId().intValue())))
                .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getTechnologypropertyvalue() throws Exception {
        // Initialize the database
        technologypropertyvalueRepository.saveAndFlush(technologypropertyvalue);

        // Get the technologypropertyvalue
        restTechnologypropertyvalueMockMvc.perform(get("/api/technologypropertyvalues/{id}", technologypropertyvalue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(technologypropertyvalue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTechnologypropertyvalue() throws Exception {
        // Get the technologypropertyvalue
        restTechnologypropertyvalueMockMvc.perform(get("/api/technologypropertyvalues/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTechnologypropertyvalue() throws Exception {
        // Initialize the database
        technologypropertyvalueRepository.saveAndFlush(technologypropertyvalue);
        int databaseSizeBeforeUpdate = technologypropertyvalueRepository.findAll().size();

        // Update the technologypropertyvalue
        Technologypropertyvalue updatedTechnologypropertyvalue = new Technologypropertyvalue();
        updatedTechnologypropertyvalue.setId(technologypropertyvalue.getId());
        updatedTechnologypropertyvalue.setValue(UPDATED_VALUE);

        restTechnologypropertyvalueMockMvc.perform(put("/api/technologypropertyvalues")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedTechnologypropertyvalue)))
                .andExpect(status().isOk());

        // Validate the Technologypropertyvalue in the database
        List<Technologypropertyvalue> technologypropertyvalues = technologypropertyvalueRepository.findAll();
        assertThat(technologypropertyvalues).hasSize(databaseSizeBeforeUpdate);
        Technologypropertyvalue testTechnologypropertyvalue = technologypropertyvalues.get(technologypropertyvalues.size() - 1);
        assertThat(testTechnologypropertyvalue.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void deleteTechnologypropertyvalue() throws Exception {
        // Initialize the database
        technologypropertyvalueRepository.saveAndFlush(technologypropertyvalue);
        int databaseSizeBeforeDelete = technologypropertyvalueRepository.findAll().size();

        // Get the technologypropertyvalue
        restTechnologypropertyvalueMockMvc.perform(delete("/api/technologypropertyvalues/{id}", technologypropertyvalue.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Technologypropertyvalue> technologypropertyvalues = technologypropertyvalueRepository.findAll();
        assertThat(technologypropertyvalues).hasSize(databaseSizeBeforeDelete - 1);
    }
}
