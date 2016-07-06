package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Groupaccess;
import com.dorsal.repository.GroupaccessRepository;

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
 * Test class for the GroupaccessResource REST controller.
 *
 * @see GroupaccessResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class GroupaccessResourceIntTest {


    @Inject
    private GroupaccessRepository groupaccessRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restGroupaccessMockMvc;

    private Groupaccess groupaccess;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        GroupaccessResource groupaccessResource = new GroupaccessResource();
        ReflectionTestUtils.setField(groupaccessResource, "groupaccessRepository", groupaccessRepository);
        this.restGroupaccessMockMvc = MockMvcBuilders.standaloneSetup(groupaccessResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        groupaccess = new Groupaccess();
    }

    @Test
    @Transactional
    public void createGroupaccess() throws Exception {
        int databaseSizeBeforeCreate = groupaccessRepository.findAll().size();

        // Create the Groupaccess

       /* restGroupaccessMockMvc.perform(post("/api/groupaccesses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(groupaccess)))
                .andExpect(status().isCreated());

        // Validate the Groupaccess in the database
        List<Groupaccess> groupaccesses = groupaccessRepository.findAll();
        assertThat(groupaccesses).hasSize(databaseSizeBeforeCreate + 1);
        Groupaccess testGroupaccess = groupaccesses.get(groupaccesses.size() - 1);*/
    }

    @Test
    @Transactional
    public void getAllGroupaccesses() throws Exception {
        // Initialize the database
        groupaccessRepository.saveAndFlush(groupaccess);

        // Get all the groupaccesses
        /*restGroupaccessMockMvc.perform(get("/api/groupaccesses?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(groupaccess.getId().intValue())));*/
    }

    @Test
    @Transactional
    public void getGroupaccess() throws Exception {
        // Initialize the database
        groupaccessRepository.saveAndFlush(groupaccess);

        // Get the groupaccess
        restGroupaccessMockMvc.perform(get("/api/groupaccesses/{id}", groupaccess.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(groupaccess.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGroupaccess() throws Exception {
        // Get the groupaccess
        restGroupaccessMockMvc.perform(get("/api/groupaccesses/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupaccess() throws Exception {
        // Initialize the database
        groupaccessRepository.saveAndFlush(groupaccess);
        int databaseSizeBeforeUpdate = groupaccessRepository.findAll().size();

        // Update the groupaccess
        Groupaccess updatedGroupaccess = new Groupaccess();
        updatedGroupaccess.setId(groupaccess.getId());

        restGroupaccessMockMvc.perform(put("/api/groupaccesses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedGroupaccess)))
                .andExpect(status().isOk());

        // Validate the Groupaccess in the database
        List<Groupaccess> groupaccesses = groupaccessRepository.findAll();
        assertThat(groupaccesses).hasSize(databaseSizeBeforeUpdate);
        Groupaccess testGroupaccess = groupaccesses.get(groupaccesses.size() - 1);
    }

    @Test
    @Transactional
    public void deleteGroupaccess() throws Exception {
        // Initialize the database
        groupaccessRepository.saveAndFlush(groupaccess);
        int databaseSizeBeforeDelete = groupaccessRepository.findAll().size();

        // Get the groupaccess
        restGroupaccessMockMvc.perform(delete("/api/groupaccesses/{id}", groupaccess.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Groupaccess> groupaccesses = groupaccessRepository.findAll();
        assertThat(groupaccesses).hasSize(databaseSizeBeforeDelete - 1);
    }
}
