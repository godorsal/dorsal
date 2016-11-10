package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Updatetype;
import com.dorsal.repository.UpdatetypeRepository;

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

import com.dorsal.domain.enumeration.Updateenum;

/**
 * Test class for the UpdatetypeResource REST controller.
 *
 * @see UpdatetypeResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class UpdatetypeResourceIntTest {


    private static final Updateenum DEFAULT_NAME = Updateenum.UPDATE;
    private static final Updateenum UPDATED_NAME = Updateenum.RESOLUTION;

    @Inject
    private UpdatetypeRepository updatetypeRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUpdatetypeMockMvc;

    private Updatetype updatetype;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UpdatetypeResource updatetypeResource = new UpdatetypeResource();
        ReflectionTestUtils.setField(updatetypeResource, "updatetypeRepository", updatetypeRepository);
        this.restUpdatetypeMockMvc = MockMvcBuilders.standaloneSetup(updatetypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        updatetype = new Updatetype();
        updatetype.setName(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createUpdatetype() throws Exception {
        int databaseSizeBeforeCreate = updatetypeRepository.findAll().size();

        // Create the Updatetype

        restUpdatetypeMockMvc.perform(post("/api/updatetypes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatetype)))
                .andExpect(status().isCreated());

        // Validate the Updatetype in the database
        List<Updatetype> updatetypes = updatetypeRepository.findAll();
        assertThat(updatetypes).hasSize(databaseSizeBeforeCreate + 1);
        Updatetype testUpdatetype = updatetypes.get(updatetypes.size() - 1);
        assertThat(testUpdatetype.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void getAllUpdatetypes() throws Exception {
        // Initialize the database
        updatetypeRepository.saveAndFlush(updatetype);

        // Get all the updatetypes
        restUpdatetypeMockMvc.perform(get("/api/updatetypes?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.[*].id").value(hasItem(updatetype.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getUpdatetype() throws Exception {
        // Initialize the database
        updatetypeRepository.saveAndFlush(updatetype);

        // Get the updatetype
        restUpdatetypeMockMvc.perform(get("/api/updatetypes/{id}", updatetype.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.id").value(updatetype.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUpdatetype() throws Exception {
        // Get the updatetype
        restUpdatetypeMockMvc.perform(get("/api/updatetypes/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUpdatetype() throws Exception {
        // Initialize the database
        updatetypeRepository.saveAndFlush(updatetype);
        int databaseSizeBeforeUpdate = updatetypeRepository.findAll().size();

        // Update the updatetype
        Updatetype updatedUpdatetype = new Updatetype();
        updatedUpdatetype.setId(updatetype.getId());
        updatedUpdatetype.setName(UPDATED_NAME);

        restUpdatetypeMockMvc.perform(put("/api/updatetypes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedUpdatetype)))
                .andExpect(status().isOk());

        // Validate the Updatetype in the database
        List<Updatetype> updatetypes = updatetypeRepository.findAll();
        assertThat(updatetypes).hasSize(databaseSizeBeforeUpdate);
        Updatetype testUpdatetype = updatetypes.get(updatetypes.size() - 1);
        assertThat(testUpdatetype.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void deleteUpdatetype() throws Exception {
        // Initialize the database
        updatetypeRepository.saveAndFlush(updatetype);
        int databaseSizeBeforeDelete = updatetypeRepository.findAll().size();

        // Get the updatetype
        restUpdatetypeMockMvc.perform(delete("/api/updatetypes/{id}", updatetype.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Updatetype> updatetypes = updatetypeRepository.findAll();
        assertThat(updatetypes).hasSize(databaseSizeBeforeDelete - 1);
    }
}
