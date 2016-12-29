package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.ExpertPool;
import com.dorsal.repository.ExpertPoolRepository;

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

import com.dorsal.domain.enumeration.ExpertSelection;
/**
 * Test class for the ExpertPoolResource REST controller.
 *
 * @see ExpertPoolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class ExpertPoolResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

    private static final ExpertSelection DEFAULT_EXPERT_SELECTION = ExpertSelection.EXPERT_IN_POOL_ONLY;
    private static final ExpertSelection UPDATED_EXPERT_SELECTION = ExpertSelection.EXPERT_IN_POOL_FIRST;

    @Inject
    private ExpertPoolRepository expertPoolRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restExpertPoolMockMvc;

    private ExpertPool expertPool;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExpertPoolResource expertPoolResource = new ExpertPoolResource();
        ReflectionTestUtils.setField(expertPoolResource, "expertPoolRepository", expertPoolRepository);
        this.restExpertPoolMockMvc = MockMvcBuilders.standaloneSetup(expertPoolResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExpertPool createEntity(EntityManager em) {
        ExpertPool expertPool = new ExpertPool()
                .name(DEFAULT_NAME)
                .description(DEFAULT_DESCRIPTION)
                .expertSelection(DEFAULT_EXPERT_SELECTION);
        return expertPool;
    }

    @Before
    public void initTest() {
        expertPool = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpertPool() throws Exception {
        int databaseSizeBeforeCreate = expertPoolRepository.findAll().size();

        // Create the ExpertPool

       /* restExpertPoolMockMvc.perform(post("/api/expert-pools")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertPool)))
                .andExpect(status().isCreated());

        // Validate the ExpertPool in the database
        List<ExpertPool> expertPools = expertPoolRepository.findAll();
        assertThat(expertPools).hasSize(databaseSizeBeforeCreate + 1);
        ExpertPool testExpertPool = expertPools.get(expertPools.size() - 1);
        assertThat(testExpertPool.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExpertPool.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testExpertPool.getExpertSelection()).isEqualTo(DEFAULT_EXPERT_SELECTION);*/
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = expertPoolRepository.findAll().size();
        // set the field null
        expertPool.setName(null);

        // Create the ExpertPool, which fails.

        restExpertPoolMockMvc.perform(post("/api/expert-pools")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertPool)))
                .andExpect(status().isBadRequest());

        List<ExpertPool> expertPools = expertPoolRepository.findAll();
        assertThat(expertPools).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = expertPoolRepository.findAll().size();
        // set the field null
        expertPool.setDescription(null);

        // Create the ExpertPool, which fails.

        restExpertPoolMockMvc.perform(post("/api/expert-pools")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertPool)))
                .andExpect(status().isBadRequest());

        List<ExpertPool> expertPools = expertPoolRepository.findAll();
        assertThat(expertPools).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExpertPools() throws Exception {
        // Initialize the database
        expertPoolRepository.saveAndFlush(expertPool);

        // Get all the expertPools
        restExpertPoolMockMvc.perform(get("/api/expert-pools?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(expertPool.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
                .andExpect(jsonPath("$.[*].expertSelection").value(hasItem(DEFAULT_EXPERT_SELECTION.toString())));
    }

    @Test
    @Transactional
    public void getExpertPool() throws Exception {
        // Initialize the database
        expertPoolRepository.saveAndFlush(expertPool);

        // Get the expertPool
        restExpertPoolMockMvc.perform(get("/api/expert-pools/{id}", expertPool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expertPool.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.expertSelection").value(DEFAULT_EXPERT_SELECTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpertPool() throws Exception {
        // Get the expertPool
        restExpertPoolMockMvc.perform(get("/api/expert-pools/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpertPool() throws Exception {
        // Initialize the database
        expertPoolRepository.saveAndFlush(expertPool);
        int databaseSizeBeforeUpdate = expertPoolRepository.findAll().size();

        // Update the expertPool
        ExpertPool updatedExpertPool = expertPoolRepository.findOne(expertPool.getId());
        updatedExpertPool
                .name(UPDATED_NAME)
                .description(UPDATED_DESCRIPTION)
                .expertSelection(UPDATED_EXPERT_SELECTION);

        restExpertPoolMockMvc.perform(put("/api/expert-pools")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedExpertPool)))
                .andExpect(status().isOk());

        // Validate the ExpertPool in the database
        List<ExpertPool> expertPools = expertPoolRepository.findAll();
        assertThat(expertPools).hasSize(databaseSizeBeforeUpdate);
        ExpertPool testExpertPool = expertPools.get(expertPools.size() - 1);
        assertThat(testExpertPool.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExpertPool.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testExpertPool.getExpertSelection()).isEqualTo(UPDATED_EXPERT_SELECTION);
    }

    @Test
    @Transactional
    public void deleteExpertPool() throws Exception {
        // Initialize the database
        expertPoolRepository.saveAndFlush(expertPool);
        int databaseSizeBeforeDelete = expertPoolRepository.findAll().size();

        // Get the expertPool
        restExpertPoolMockMvc.perform(delete("/api/expert-pools/{id}", expertPool.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpertPool> expertPools = expertPoolRepository.findAll();
        assertThat(expertPools).hasSize(databaseSizeBeforeDelete - 1);
    }
}
