package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.ExpertAttribute;
import com.dorsal.repository.ExpertAttributeRepository;

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
 * Test class for the ExpertAttributeResource REST controller.
 *
 * @see ExpertAttributeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class ExpertAttributeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

    @Inject
    private ExpertAttributeRepository expertAttributeRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restExpertAttributeMockMvc;

    private ExpertAttribute expertAttribute;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExpertAttributeResource expertAttributeResource = new ExpertAttributeResource();
        ReflectionTestUtils.setField(expertAttributeResource, "expertAttributeRepository", expertAttributeRepository);
        this.restExpertAttributeMockMvc = MockMvcBuilders.standaloneSetup(expertAttributeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExpertAttribute createEntity(EntityManager em) {
        ExpertAttribute expertAttribute = new ExpertAttribute()
                .name(DEFAULT_NAME)
                .description(DEFAULT_DESCRIPTION);
        return expertAttribute;
    }

    @Before
    public void initTest() {
        expertAttribute = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpertAttribute() throws Exception {
        int databaseSizeBeforeCreate = expertAttributeRepository.findAll().size();

        // Create the ExpertAttribute

        restExpertAttributeMockMvc.perform(post("/api/expert-attributes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertAttribute)))
                .andExpect(status().isCreated());

        // Validate the ExpertAttribute in the database
        List<ExpertAttribute> expertAttributes = expertAttributeRepository.findAll();
        assertThat(expertAttributes).hasSize(databaseSizeBeforeCreate + 1);
        ExpertAttribute testExpertAttribute = expertAttributes.get(expertAttributes.size() - 1);
        assertThat(testExpertAttribute.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExpertAttribute.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = expertAttributeRepository.findAll().size();
        // set the field null
        expertAttribute.setName(null);

        // Create the ExpertAttribute, which fails.

        restExpertAttributeMockMvc.perform(post("/api/expert-attributes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertAttribute)))
                .andExpect(status().isBadRequest());

        List<ExpertAttribute> expertAttributes = expertAttributeRepository.findAll();
        assertThat(expertAttributes).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExpertAttributes() throws Exception {
        // Initialize the database
        expertAttributeRepository.saveAndFlush(expertAttribute);

        // Get all the expertAttributes
        restExpertAttributeMockMvc.perform(get("/api/expert-attributes?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(expertAttribute.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getExpertAttribute() throws Exception {
        // Initialize the database
        expertAttributeRepository.saveAndFlush(expertAttribute);

        // Get the expertAttribute
        restExpertAttributeMockMvc.perform(get("/api/expert-attributes/{id}", expertAttribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expertAttribute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpertAttribute() throws Exception {
        // Get the expertAttribute
        restExpertAttributeMockMvc.perform(get("/api/expert-attributes/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpertAttribute() throws Exception {
        // Initialize the database
        expertAttributeRepository.saveAndFlush(expertAttribute);
        int databaseSizeBeforeUpdate = expertAttributeRepository.findAll().size();

        // Update the expertAttribute
        ExpertAttribute updatedExpertAttribute = expertAttributeRepository.findOne(expertAttribute.getId());
        updatedExpertAttribute
                .name(UPDATED_NAME)
                .description(UPDATED_DESCRIPTION);

        restExpertAttributeMockMvc.perform(put("/api/expert-attributes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedExpertAttribute)))
                .andExpect(status().isOk());

        // Validate the ExpertAttribute in the database
        List<ExpertAttribute> expertAttributes = expertAttributeRepository.findAll();
        assertThat(expertAttributes).hasSize(databaseSizeBeforeUpdate);
        ExpertAttribute testExpertAttribute = expertAttributes.get(expertAttributes.size() - 1);
        assertThat(testExpertAttribute.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExpertAttribute.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deleteExpertAttribute() throws Exception {
        // Initialize the database
        expertAttributeRepository.saveAndFlush(expertAttribute);
        int databaseSizeBeforeDelete = expertAttributeRepository.findAll().size();

        // Get the expertAttribute
        restExpertAttributeMockMvc.perform(delete("/api/expert-attributes/{id}", expertAttribute.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpertAttribute> expertAttributes = expertAttributeRepository.findAll();
        assertThat(expertAttributes).hasSize(databaseSizeBeforeDelete - 1);
    }
}
