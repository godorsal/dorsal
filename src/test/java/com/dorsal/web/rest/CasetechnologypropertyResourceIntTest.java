package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Casetechnologyproperty;
import com.dorsal.repository.CasetechnologypropertyRepository;

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
 * Test class for the CasetechnologypropertyResource REST controller.
 *
 * @see CasetechnologypropertyResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class CasetechnologypropertyResourceIntTest {

    private static final String DEFAULT_PROPERTYNAME = "AAAAA";
    private static final String UPDATED_PROPERTYNAME = "BBBBB";
    private static final String DEFAULT_PROPERTYVALUE = "AAAAA";
    private static final String UPDATED_PROPERTYVALUE = "BBBBB";

    @Inject
    private CasetechnologypropertyRepository casetechnologypropertyRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCasetechnologypropertyMockMvc;

    private Casetechnologyproperty casetechnologyproperty;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CasetechnologypropertyResource casetechnologypropertyResource = new CasetechnologypropertyResource();
        ReflectionTestUtils.setField(casetechnologypropertyResource, "casetechnologypropertyRepository", casetechnologypropertyRepository);
        this.restCasetechnologypropertyMockMvc = MockMvcBuilders.standaloneSetup(casetechnologypropertyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        casetechnologyproperty = new Casetechnologyproperty();
        casetechnologyproperty.setPropertyname(DEFAULT_PROPERTYNAME);
        casetechnologyproperty.setPropertyvalue(DEFAULT_PROPERTYVALUE);
    }

    @Test
    @Transactional
    public void createCasetechnologyproperty() throws Exception {
        int databaseSizeBeforeCreate = casetechnologypropertyRepository.findAll().size();

        // Create the Casetechnologyproperty

        restCasetechnologypropertyMockMvc.perform(post("/api/casetechnologyproperties")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(casetechnologyproperty)))
                .andExpect(status().isCreated());

        // Validate the Casetechnologyproperty in the database
        List<Casetechnologyproperty> casetechnologyproperties = casetechnologypropertyRepository.findAll();
        assertThat(casetechnologyproperties).hasSize(databaseSizeBeforeCreate + 1);
        Casetechnologyproperty testCasetechnologyproperty = casetechnologyproperties.get(casetechnologyproperties.size() - 1);
        assertThat(testCasetechnologyproperty.getPropertyname()).isEqualTo(DEFAULT_PROPERTYNAME);
        assertThat(testCasetechnologyproperty.getPropertyvalue()).isEqualTo(DEFAULT_PROPERTYVALUE);
    }

    @Test
    @Transactional
    public void getAllCasetechnologyproperties() throws Exception {
        // Initialize the database
        casetechnologypropertyRepository.saveAndFlush(casetechnologyproperty);

        // Get all the casetechnologyproperties
        restCasetechnologypropertyMockMvc.perform(get("/api/casetechnologyproperties?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.[*].id").value(hasItem(casetechnologyproperty.getId().intValue())))
                .andExpect(jsonPath("$.[*].propertyname").value(hasItem(DEFAULT_PROPERTYNAME.toString())))
                .andExpect(jsonPath("$.[*].propertyvalue").value(hasItem(DEFAULT_PROPERTYVALUE.toString())));
    }

    @Test
    @Transactional
    public void getCasetechnologyproperty() throws Exception {
        // Initialize the database
        casetechnologypropertyRepository.saveAndFlush(casetechnologyproperty);

        // Get the casetechnologyproperty
        restCasetechnologypropertyMockMvc.perform(get("/api/casetechnologyproperties/{id}", casetechnologyproperty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.id").value(casetechnologyproperty.getId().intValue()))
            .andExpect(jsonPath("$.propertyname").value(DEFAULT_PROPERTYNAME.toString()))
            .andExpect(jsonPath("$.propertyvalue").value(DEFAULT_PROPERTYVALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCasetechnologyproperty() throws Exception {
        // Get the casetechnologyproperty
        restCasetechnologypropertyMockMvc.perform(get("/api/casetechnologyproperties/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCasetechnologyproperty() throws Exception {
        // Initialize the database
        casetechnologypropertyRepository.saveAndFlush(casetechnologyproperty);
        int databaseSizeBeforeUpdate = casetechnologypropertyRepository.findAll().size();

        // Update the casetechnologyproperty
        Casetechnologyproperty updatedCasetechnologyproperty = new Casetechnologyproperty();
        updatedCasetechnologyproperty.setId(casetechnologyproperty.getId());
        updatedCasetechnologyproperty.setPropertyname(UPDATED_PROPERTYNAME);
        updatedCasetechnologyproperty.setPropertyvalue(UPDATED_PROPERTYVALUE);

        restCasetechnologypropertyMockMvc.perform(put("/api/casetechnologyproperties")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedCasetechnologyproperty)))
                .andExpect(status().isOk());

        // Validate the Casetechnologyproperty in the database
        List<Casetechnologyproperty> casetechnologyproperties = casetechnologypropertyRepository.findAll();
        assertThat(casetechnologyproperties).hasSize(databaseSizeBeforeUpdate);
        Casetechnologyproperty testCasetechnologyproperty = casetechnologyproperties.get(casetechnologyproperties.size() - 1);
        assertThat(testCasetechnologyproperty.getPropertyname()).isEqualTo(UPDATED_PROPERTYNAME);
        assertThat(testCasetechnologyproperty.getPropertyvalue()).isEqualTo(UPDATED_PROPERTYVALUE);
    }

    @Test
    @Transactional
    public void deleteCasetechnologyproperty() throws Exception {
        // Initialize the database
        casetechnologypropertyRepository.saveAndFlush(casetechnologyproperty);
        int databaseSizeBeforeDelete = casetechnologypropertyRepository.findAll().size();

        // Get the casetechnologyproperty
        restCasetechnologypropertyMockMvc.perform(delete("/api/casetechnologyproperties/{id}", casetechnologyproperty.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Casetechnologyproperty> casetechnologyproperties = casetechnologypropertyRepository.findAll();
        assertThat(casetechnologyproperties).hasSize(databaseSizeBeforeDelete - 1);
    }
}
