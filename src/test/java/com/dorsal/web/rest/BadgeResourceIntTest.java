package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Badge;
import com.dorsal.repository.BadgeRepository;

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
 * Test class for the BadgeResource REST controller.
 *
 * @see BadgeResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class BadgeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_CODE = "AAAAA";
    private static final String UPDATED_CODE = "BBBBB";

    private static final Integer DEFAULT_ORDINAL = 1;
    private static final Integer UPDATED_ORDINAL = 2;

    @Inject
    private BadgeRepository badgeRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restBadgeMockMvc;

    private Badge badge;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BadgeResource badgeResource = new BadgeResource();
        ReflectionTestUtils.setField(badgeResource, "badgeRepository", badgeRepository);
        this.restBadgeMockMvc = MockMvcBuilders.standaloneSetup(badgeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        badge = new Badge();
        badge.setName(DEFAULT_NAME);
        badge.setCode(DEFAULT_CODE);
        badge.setOrdinal(DEFAULT_ORDINAL);
    }

    @Test
    @Transactional
    public void createBadge() throws Exception {
        int databaseSizeBeforeCreate = badgeRepository.findAll().size();

        // Create the Badge

        restBadgeMockMvc.perform(post("/api/badges")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(badge)))
                .andExpect(status().isCreated());

        // Validate the Badge in the database
        List<Badge> badges = badgeRepository.findAll();
        assertThat(badges).hasSize(databaseSizeBeforeCreate + 1);
        Badge testBadge = badges.get(badges.size() - 1);
        assertThat(testBadge.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBadge.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testBadge.getOrdinal()).isEqualTo(DEFAULT_ORDINAL);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = badgeRepository.findAll().size();
        // set the field null
        badge.setName(null);

        // Create the Badge, which fails.

        restBadgeMockMvc.perform(post("/api/badges")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(badge)))
                .andExpect(status().isBadRequest());

        List<Badge> badges = badgeRepository.findAll();
        assertThat(badges).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBadges() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        // Get all the badges
        restBadgeMockMvc.perform(get("/api/badges?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(badge.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
                .andExpect(jsonPath("$.[*].ordinal").value(hasItem(DEFAULT_ORDINAL)));
    }

    @Test
    @Transactional
    public void getBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        // Get the badge
        restBadgeMockMvc.perform(get("/api/badges/{id}", badge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(badge.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.ordinal").value(DEFAULT_ORDINAL));
    }

    @Test
    @Transactional
    public void getNonExistingBadge() throws Exception {
        // Get the badge
        restBadgeMockMvc.perform(get("/api/badges/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);
        int databaseSizeBeforeUpdate = badgeRepository.findAll().size();

        // Update the badge
        Badge updatedBadge = new Badge();
        updatedBadge.setId(badge.getId());
        updatedBadge.setName(UPDATED_NAME);
        updatedBadge.setCode(UPDATED_CODE);
        updatedBadge.setOrdinal(UPDATED_ORDINAL);

        restBadgeMockMvc.perform(put("/api/badges")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedBadge)))
                .andExpect(status().isOk());

        // Validate the Badge in the database
        List<Badge> badges = badgeRepository.findAll();
        assertThat(badges).hasSize(databaseSizeBeforeUpdate);
        Badge testBadge = badges.get(badges.size() - 1);
        assertThat(testBadge.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBadge.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testBadge.getOrdinal()).isEqualTo(UPDATED_ORDINAL);
    }

    @Test
    @Transactional
    public void deleteBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);
        int databaseSizeBeforeDelete = badgeRepository.findAll().size();

        // Get the badge
        restBadgeMockMvc.perform(delete("/api/badges/{id}", badge.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Badge> badges = badgeRepository.findAll();
        assertThat(badges).hasSize(databaseSizeBeforeDelete - 1);
    }
}
