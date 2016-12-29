package com.dorsal.web.rest;

import com.dorsal.DorsalApp;

import com.dorsal.domain.ProductExpertScore;
import com.dorsal.repository.ProductExpertScoreRepository;

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
 * Test class for the ProductExpertScoreResource REST controller.
 *
 * @see ProductExpertScoreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DorsalApp.class)
public class ProductExpertScoreResourceIntTest {


    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Inject
    private ProductExpertScoreRepository productExpertScoreRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restProductExpertScoreMockMvc;

    private ProductExpertScore productExpertScore;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ProductExpertScoreResource productExpertScoreResource = new ProductExpertScoreResource();
        ReflectionTestUtils.setField(productExpertScoreResource, "productExpertScoreRepository", productExpertScoreRepository);
        this.restProductExpertScoreMockMvc = MockMvcBuilders.standaloneSetup(productExpertScoreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductExpertScore createEntity(EntityManager em) {
        ProductExpertScore productExpertScore = new ProductExpertScore()
                .score(DEFAULT_SCORE);
        return productExpertScore;
    }

    @Before
    public void initTest() {
        productExpertScore = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductExpertScore() throws Exception {
        int databaseSizeBeforeCreate = productExpertScoreRepository.findAll().size();

        // Create the ProductExpertScore

        restProductExpertScoreMockMvc.perform(post("/api/product-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(productExpertScore)))
                .andExpect(status().isCreated());

        // Validate the ProductExpertScore in the database
        List<ProductExpertScore> productExpertScores = productExpertScoreRepository.findAll();
        assertThat(productExpertScores).hasSize(databaseSizeBeforeCreate + 1);
        ProductExpertScore testProductExpertScore = productExpertScores.get(productExpertScores.size() - 1);
        assertThat(testProductExpertScore.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void getAllProductExpertScores() throws Exception {
        // Initialize the database
        productExpertScoreRepository.saveAndFlush(productExpertScore);

        // Get all the productExpertScores
        restProductExpertScoreMockMvc.perform(get("/api/product-expert-scores?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(productExpertScore.getId().intValue())))
                .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }

    @Test
    @Transactional
    public void getProductExpertScore() throws Exception {
        // Initialize the database
        productExpertScoreRepository.saveAndFlush(productExpertScore);

        // Get the productExpertScore
        restProductExpertScoreMockMvc.perform(get("/api/product-expert-scores/{id}", productExpertScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productExpertScore.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingProductExpertScore() throws Exception {
        // Get the productExpertScore
        restProductExpertScoreMockMvc.perform(get("/api/product-expert-scores/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductExpertScore() throws Exception {
        // Initialize the database
        productExpertScoreRepository.saveAndFlush(productExpertScore);
        int databaseSizeBeforeUpdate = productExpertScoreRepository.findAll().size();

        // Update the productExpertScore
        ProductExpertScore updatedProductExpertScore = productExpertScoreRepository.findOne(productExpertScore.getId());
        updatedProductExpertScore
                .score(UPDATED_SCORE);

        restProductExpertScoreMockMvc.perform(put("/api/product-expert-scores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedProductExpertScore)))
                .andExpect(status().isOk());

        // Validate the ProductExpertScore in the database
        List<ProductExpertScore> productExpertScores = productExpertScoreRepository.findAll();
        assertThat(productExpertScores).hasSize(databaseSizeBeforeUpdate);
        ProductExpertScore testProductExpertScore = productExpertScores.get(productExpertScores.size() - 1);
        assertThat(testProductExpertScore.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void deleteProductExpertScore() throws Exception {
        // Initialize the database
        productExpertScoreRepository.saveAndFlush(productExpertScore);
        int databaseSizeBeforeDelete = productExpertScoreRepository.findAll().size();

        // Get the productExpertScore
        restProductExpertScoreMockMvc.perform(delete("/api/product-expert-scores/{id}", productExpertScore.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductExpertScore> productExpertScores = productExpertScoreRepository.findAll();
        assertThat(productExpertScores).hasSize(databaseSizeBeforeDelete - 1);
    }
}
