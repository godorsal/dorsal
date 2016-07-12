package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.GlobalMetadata;
import com.dorsal.repository.GlobalMetadataRepository;

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

import com.dorsal.domain.enumeration.Metadatatypeenum;

/**
 * Test class for the GlobalMetadataResource REST controller.
 *
 * @see GlobalMetadataResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class GlobalMetadataResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_VALUE = "AAAAA";
    private static final String UPDATED_VALUE = "BBBBB";

    private static final Metadatatypeenum DEFAULT_VALUE_TYPE = Metadatatypeenum.ISSTRING;
    private static final Metadatatypeenum UPDATED_VALUE_TYPE = Metadatatypeenum.ISINTEGER;

    @Inject
    private GlobalMetadataRepository globalMetadataRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restGlobalMetadataMockMvc;

    private GlobalMetadata globalMetadata;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        GlobalMetadataResource globalMetadataResource = new GlobalMetadataResource();
        ReflectionTestUtils.setField(globalMetadataResource, "globalMetadataRepository", globalMetadataRepository);
        this.restGlobalMetadataMockMvc = MockMvcBuilders.standaloneSetup(globalMetadataResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        globalMetadata = new GlobalMetadata();
        globalMetadata.setName(DEFAULT_NAME);
        globalMetadata.setValue(DEFAULT_VALUE);
        globalMetadata.setValueType(DEFAULT_VALUE_TYPE);
    }

    @Test
    @Transactional
    public void createGlobalMetadata() throws Exception {
        int databaseSizeBeforeCreate = globalMetadataRepository.findAll().size();

        // Create the GlobalMetadata

        restGlobalMetadataMockMvc.perform(post("/api/global-metadata")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(globalMetadata)))
                .andExpect(status().isCreated());

        // Validate the GlobalMetadata in the database
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        assertThat(globalMetadata).hasSize(databaseSizeBeforeCreate + 1);
        GlobalMetadata testGlobalMetadata = globalMetadata.get(globalMetadata.size() - 1);
        assertThat(testGlobalMetadata.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGlobalMetadata.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testGlobalMetadata.getValueType()).isEqualTo(DEFAULT_VALUE_TYPE);
    }

    @Test
    @Transactional
    public void getAllGlobalMetadata() throws Exception {
        // Initialize the database
        globalMetadataRepository.saveAndFlush(globalMetadata);

        // Get all the globalMetadata
        restGlobalMetadataMockMvc.perform(get("/api/global-metadata?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(globalMetadata.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
                .andExpect(jsonPath("$.[*].valueType").value(hasItem(DEFAULT_VALUE_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getGlobalMetadata() throws Exception {
        // Initialize the database
        globalMetadataRepository.saveAndFlush(globalMetadata);

        // Get the globalMetadata
        restGlobalMetadataMockMvc.perform(get("/api/global-metadata/{id}", globalMetadata.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(globalMetadata.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.valueType").value(DEFAULT_VALUE_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGlobalMetadata() throws Exception {
        // Get the globalMetadata
        restGlobalMetadataMockMvc.perform(get("/api/global-metadata/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGlobalMetadata() throws Exception {
        // Initialize the database
        globalMetadataRepository.saveAndFlush(globalMetadata);
        int databaseSizeBeforeUpdate = globalMetadataRepository.findAll().size();

        // Update the globalMetadata
        GlobalMetadata updatedGlobalMetadata = new GlobalMetadata();
        updatedGlobalMetadata.setId(globalMetadata.getId());
        updatedGlobalMetadata.setName(UPDATED_NAME);
        updatedGlobalMetadata.setValue(UPDATED_VALUE);
        updatedGlobalMetadata.setValueType(UPDATED_VALUE_TYPE);

        restGlobalMetadataMockMvc.perform(put("/api/global-metadata")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedGlobalMetadata)))
                .andExpect(status().isOk());

        // Validate the GlobalMetadata in the database
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        assertThat(globalMetadata).hasSize(databaseSizeBeforeUpdate);
        GlobalMetadata testGlobalMetadata = globalMetadata.get(globalMetadata.size() - 1);
        assertThat(testGlobalMetadata.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGlobalMetadata.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testGlobalMetadata.getValueType()).isEqualTo(UPDATED_VALUE_TYPE);
    }

    @Test
    @Transactional
    public void deleteGlobalMetadata() throws Exception {
        // Initialize the database
        globalMetadataRepository.saveAndFlush(globalMetadata);
        int databaseSizeBeforeDelete = globalMetadataRepository.findAll().size();

        // Get the globalMetadata
        restGlobalMetadataMockMvc.perform(delete("/api/global-metadata/{id}", globalMetadata.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        assertThat(globalMetadata).hasSize(databaseSizeBeforeDelete - 1);
    }
}
