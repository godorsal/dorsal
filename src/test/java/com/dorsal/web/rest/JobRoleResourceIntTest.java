package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.JobRole;
import com.dorsal.repository.JobRoleRepository;

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
 * Test class for the JobRoleResource REST controller.
 *
 * @see JobRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class JobRoleResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
    private static final String DEFAULT_CODE = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

    @Inject
    private JobRoleRepository jobRoleRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restJobRoleMockMvc;

    private JobRole jobRole;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        JobRoleResource jobRoleResource = new JobRoleResource();
        ReflectionTestUtils.setField(jobRoleResource, "jobRoleRepository", jobRoleRepository);
        this.restJobRoleMockMvc = MockMvcBuilders.standaloneSetup(jobRoleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobRole createEntity(EntityManager em) {
        JobRole jobRole = new JobRole()
                .name(DEFAULT_NAME)
                .code(DEFAULT_CODE);
        return jobRole;
    }

    @Before
    public void initTest() {
        jobRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobRole() throws Exception {
        int databaseSizeBeforeCreate = jobRoleRepository.findAll().size();

        // Create the JobRole

        restJobRoleMockMvc.perform(post("/api/job-roles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(jobRole)))
                .andExpect(status().isCreated());

        // Validate the JobRole in the database
        List<JobRole> jobRoles = jobRoleRepository.findAll();
        assertThat(jobRoles).hasSize(databaseSizeBeforeCreate + 1);
        JobRole testJobRole = jobRoles.get(jobRoles.size() - 1);
        assertThat(testJobRole.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testJobRole.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = jobRoleRepository.findAll().size();
        // set the field null
        jobRole.setName(null);

        // Create the JobRole, which fails.

        restJobRoleMockMvc.perform(post("/api/job-roles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(jobRole)))
                .andExpect(status().isBadRequest());

        List<JobRole> jobRoles = jobRoleRepository.findAll();
        assertThat(jobRoles).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllJobRoles() throws Exception {
        // Initialize the database
        jobRoleRepository.saveAndFlush(jobRole);

        // Get all the jobRoles
        restJobRoleMockMvc.perform(get("/api/job-roles?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(jobRole.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void getJobRole() throws Exception {
        // Initialize the database
        jobRoleRepository.saveAndFlush(jobRole);

        // Get the jobRole
        restJobRoleMockMvc.perform(get("/api/job-roles/{id}", jobRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobRole.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJobRole() throws Exception {
        // Get the jobRole
        restJobRoleMockMvc.perform(get("/api/job-roles/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobRole() throws Exception {
        // Initialize the database
        jobRoleRepository.saveAndFlush(jobRole);
        int databaseSizeBeforeUpdate = jobRoleRepository.findAll().size();

        // Update the jobRole
        JobRole updatedJobRole = jobRoleRepository.findOne(jobRole.getId());
        updatedJobRole
                .name(UPDATED_NAME)
                .code(UPDATED_CODE);

        restJobRoleMockMvc.perform(put("/api/job-roles")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedJobRole)))
                .andExpect(status().isOk());

        // Validate the JobRole in the database
        List<JobRole> jobRoles = jobRoleRepository.findAll();
        assertThat(jobRoles).hasSize(databaseSizeBeforeUpdate);
        JobRole testJobRole = jobRoles.get(jobRoles.size() - 1);
        assertThat(testJobRole.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testJobRole.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void deleteJobRole() throws Exception {
        // Initialize the database
        jobRoleRepository.saveAndFlush(jobRole);
        int databaseSizeBeforeDelete = jobRoleRepository.findAll().size();

        // Get the jobRole
        restJobRoleMockMvc.perform(delete("/api/job-roles/{id}", jobRole.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<JobRole> jobRoles = jobRoleRepository.findAll();
        assertThat(jobRoles).hasSize(databaseSizeBeforeDelete - 1);
    }
}
