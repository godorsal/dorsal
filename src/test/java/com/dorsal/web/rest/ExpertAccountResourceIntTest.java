package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.repository.ExpertAccountRepository;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the ExpertAccountResource REST controller.
 *
 * @see ExpertAccountResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class ExpertAccountResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));

    private static final String DEFAULT_PHONE = "AAAAA";
    private static final String UPDATED_PHONE = "BBBBB";
    private static final String DEFAULT_SKYPE = "AAAAA";
    private static final String UPDATED_SKYPE = "BBBBB";
    private static final String DEFAULT_OTHERCOMMUNICATION = "AAAAA";
    private static final String UPDATED_OTHERCOMMUNICATION = "BBBBB";
    private static final String DEFAULT_LOCATION = "AAAAA";
    private static final String UPDATED_LOCATION = "BBBBB";

    private static final Integer DEFAULT_EXPERT_SCORE = 1;
    private static final Integer UPDATED_EXPERT_SCORE = 2;
    private static final String DEFAULT_HANDLE = "AAAAA";
    private static final String UPDATED_HANDLE = "BBBBB";
    private static final String DEFAULT_LANGUAGES = "AAAAA";
    private static final String UPDATED_LANGUAGES = "BBBBB";
    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
    private static final String DEFAULT_FIRST_TECHNOLOGY_PREFERENCE = "AAAAA";
    private static final String UPDATED_FIRST_TECHNOLOGY_PREFERENCE = "BBBBB";
    private static final String DEFAULT_SECOND_TECHNOLOGY_PREFERENCE = "AAAAA";
    private static final String UPDATED_SECOND_TECHNOLOGY_PREFERENCE = "BBBBB";
    private static final String DEFAULT_THIRD_TECHNOLOGY_PREFERENCE = "AAAAA";
    private static final String UPDATED_THIRD_TECHNOLOGY_PREFERENCE = "BBBBB";

    private static final Boolean DEFAULT_IS_AVAILABLE = false;
    private static final Boolean UPDATED_IS_AVAILABLE = true;
    private static final String DEFAULT_EXPERT_BIO = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_EXPERT_BIO = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_EXPERT_SINCE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_EXPERT_SINCE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_EXPERT_SINCE_STR = dateTimeFormatter.format(DEFAULT_EXPERT_SINCE);

    private static final Integer DEFAULT_NUMBER_OF_CASES = 1;
    private static final Integer UPDATED_NUMBER_OF_CASES = 2;

    @Inject
    private ExpertAccountRepository expertAccountRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restExpertAccountMockMvc;

    private ExpertAccount expertAccount;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExpertAccountResource expertAccountResource = new ExpertAccountResource();
        ReflectionTestUtils.setField(expertAccountResource, "expertAccountRepository", expertAccountRepository);
        this.restExpertAccountMockMvc = MockMvcBuilders.standaloneSetup(expertAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        expertAccount = new ExpertAccount();
        expertAccount.setPhone(DEFAULT_PHONE);
        expertAccount.setSkype(DEFAULT_SKYPE);
        expertAccount.setOthercommunication(DEFAULT_OTHERCOMMUNICATION);
        expertAccount.setLocation(DEFAULT_LOCATION);
        expertAccount.setExpertScore(DEFAULT_EXPERT_SCORE);
        expertAccount.setHandle(DEFAULT_HANDLE);
        expertAccount.setLanguages(DEFAULT_LANGUAGES);
        expertAccount.setImagePath(DEFAULT_IMAGE_PATH);
        expertAccount.setFirstTechnologyPreference(DEFAULT_FIRST_TECHNOLOGY_PREFERENCE);
        expertAccount.setSecondTechnologyPreference(DEFAULT_SECOND_TECHNOLOGY_PREFERENCE);
        expertAccount.setThirdTechnologyPreference(DEFAULT_THIRD_TECHNOLOGY_PREFERENCE);
        expertAccount.setIsAvailable(DEFAULT_IS_AVAILABLE);
        expertAccount.setExpertBio(DEFAULT_EXPERT_BIO);
        expertAccount.setExpertSince(DEFAULT_EXPERT_SINCE);
        expertAccount.setNumberOfCases(DEFAULT_NUMBER_OF_CASES);
    }

    @Test
    @Transactional
    public void createExpertAccount() throws Exception {
        int databaseSizeBeforeCreate = expertAccountRepository.findAll().size();

        // Create the ExpertAccount

        restExpertAccountMockMvc.perform(post("/api/expert-accounts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(expertAccount)))
                .andExpect(status().isCreated());

        // Validate the ExpertAccount in the database
        List<ExpertAccount> expertAccounts = expertAccountRepository.findAll();
        assertThat(expertAccounts).hasSize(databaseSizeBeforeCreate + 1);
        ExpertAccount testExpertAccount = expertAccounts.get(expertAccounts.size() - 1);
        assertThat(testExpertAccount.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testExpertAccount.getSkype()).isEqualTo(DEFAULT_SKYPE);
        assertThat(testExpertAccount.getOthercommunication()).isEqualTo(DEFAULT_OTHERCOMMUNICATION);
        assertThat(testExpertAccount.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testExpertAccount.getExpertScore()).isEqualTo(DEFAULT_EXPERT_SCORE);
        assertThat(testExpertAccount.getHandle()).isEqualTo(DEFAULT_HANDLE);
        assertThat(testExpertAccount.getLanguages()).isEqualTo(DEFAULT_LANGUAGES);
        assertThat(testExpertAccount.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testExpertAccount.getFirstTechnologyPreference()).isEqualTo(DEFAULT_FIRST_TECHNOLOGY_PREFERENCE);
        assertThat(testExpertAccount.getSecondTechnologyPreference()).isEqualTo(DEFAULT_SECOND_TECHNOLOGY_PREFERENCE);
        assertThat(testExpertAccount.getThirdTechnologyPreference()).isEqualTo(DEFAULT_THIRD_TECHNOLOGY_PREFERENCE);
        assertThat(testExpertAccount.isIsAvailable()).isEqualTo(DEFAULT_IS_AVAILABLE);
        assertThat(testExpertAccount.getExpertBio()).isEqualTo(DEFAULT_EXPERT_BIO);
        assertThat(testExpertAccount.getExpertSince()).isEqualTo(DEFAULT_EXPERT_SINCE);
        assertThat(testExpertAccount.getNumberOfCases()).isEqualTo(DEFAULT_NUMBER_OF_CASES);
    }

    @Test
    @Transactional
    public void getAllExpertAccounts() throws Exception {
        // Initialize the database
        expertAccountRepository.saveAndFlush(expertAccount);

        // Get all the expertAccounts
/*
        restExpertAccountMockMvc.perform(get("/api/expert-accounts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(expertAccount.getId().intValue())))
                .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
                .andExpect(jsonPath("$.[*].skype").value(hasItem(DEFAULT_SKYPE.toString())))
                .andExpect(jsonPath("$.[*].othercommunication").value(hasItem(DEFAULT_OTHERCOMMUNICATION.toString())))
                .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
                .andExpect(jsonPath("$.[*].expertScore").value(hasItem(DEFAULT_EXPERT_SCORE)))
                .andExpect(jsonPath("$.[*].handle").value(hasItem(DEFAULT_HANDLE.toString())))
                .andExpect(jsonPath("$.[*].languages").value(hasItem(DEFAULT_LANGUAGES.toString())))
                .andExpect(jsonPath("$.[*].imagePath").value(hasItem(DEFAULT_IMAGE_PATH.toString())))
                .andExpect(jsonPath("$.[*].firstTechnologyPreference").value(hasItem(DEFAULT_FIRST_TECHNOLOGY_PREFERENCE.toString())))
                .andExpect(jsonPath("$.[*].secondTechnologyPreference").value(hasItem(DEFAULT_SECOND_TECHNOLOGY_PREFERENCE.toString())))
                .andExpect(jsonPath("$.[*].thirdTechnologyPreference").value(hasItem(DEFAULT_THIRD_TECHNOLOGY_PREFERENCE.toString())))
                .andExpect(jsonPath("$.[*].isAvailable").value(hasItem(DEFAULT_IS_AVAILABLE.booleanValue())))
                .andExpect(jsonPath("$.[*].expertBio").value(hasItem(DEFAULT_EXPERT_BIO.toString())))
                .andExpect(jsonPath("$.[*].expertSince").value(hasItem(DEFAULT_EXPERT_SINCE_STR)))
                .andExpect(jsonPath("$.[*].numberOfCases").value(hasItem(DEFAULT_NUMBER_OF_CASES)));
*/
    }

    @Test
    @Transactional
    public void getExpertAccount() throws Exception {
        // Initialize the database
        expertAccountRepository.saveAndFlush(expertAccount);

        // Get the expertAccount
        restExpertAccountMockMvc.perform(get("/api/expert-accounts/{id}", expertAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(expertAccount.getId().intValue()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.skype").value(DEFAULT_SKYPE.toString()))
            .andExpect(jsonPath("$.othercommunication").value(DEFAULT_OTHERCOMMUNICATION.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.expertScore").value(DEFAULT_EXPERT_SCORE))
            .andExpect(jsonPath("$.handle").value(DEFAULT_HANDLE.toString()))
            .andExpect(jsonPath("$.languages").value(DEFAULT_LANGUAGES.toString()))
            .andExpect(jsonPath("$.imagePath").value(DEFAULT_IMAGE_PATH.toString()))
            .andExpect(jsonPath("$.firstTechnologyPreference").value(DEFAULT_FIRST_TECHNOLOGY_PREFERENCE.toString()))
            .andExpect(jsonPath("$.secondTechnologyPreference").value(DEFAULT_SECOND_TECHNOLOGY_PREFERENCE.toString()))
            .andExpect(jsonPath("$.thirdTechnologyPreference").value(DEFAULT_THIRD_TECHNOLOGY_PREFERENCE.toString()))
            .andExpect(jsonPath("$.isAvailable").value(DEFAULT_IS_AVAILABLE.booleanValue()))
            .andExpect(jsonPath("$.expertBio").value(DEFAULT_EXPERT_BIO.toString()))
            .andExpect(jsonPath("$.expertSince").value(DEFAULT_EXPERT_SINCE_STR))
            .andExpect(jsonPath("$.numberOfCases").value(DEFAULT_NUMBER_OF_CASES));
    }

    @Test
    @Transactional
    public void getNonExistingExpertAccount() throws Exception {
        // Get the expertAccount
        restExpertAccountMockMvc.perform(get("/api/expert-accounts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpertAccount() throws Exception {
        // Initialize the database
        expertAccountRepository.saveAndFlush(expertAccount);
        int databaseSizeBeforeUpdate = expertAccountRepository.findAll().size();

        // Update the expertAccount
        ExpertAccount updatedExpertAccount = new ExpertAccount();
        updatedExpertAccount.setId(expertAccount.getId());
        updatedExpertAccount.setPhone(UPDATED_PHONE);
        updatedExpertAccount.setSkype(UPDATED_SKYPE);
        updatedExpertAccount.setOthercommunication(UPDATED_OTHERCOMMUNICATION);
        updatedExpertAccount.setLocation(UPDATED_LOCATION);
        updatedExpertAccount.setExpertScore(UPDATED_EXPERT_SCORE);
        updatedExpertAccount.setHandle(UPDATED_HANDLE);
        updatedExpertAccount.setLanguages(UPDATED_LANGUAGES);
        updatedExpertAccount.setImagePath(UPDATED_IMAGE_PATH);
        updatedExpertAccount.setFirstTechnologyPreference(UPDATED_FIRST_TECHNOLOGY_PREFERENCE);
        updatedExpertAccount.setSecondTechnologyPreference(UPDATED_SECOND_TECHNOLOGY_PREFERENCE);
        updatedExpertAccount.setThirdTechnologyPreference(UPDATED_THIRD_TECHNOLOGY_PREFERENCE);
        updatedExpertAccount.setIsAvailable(UPDATED_IS_AVAILABLE);
        updatedExpertAccount.setExpertBio(UPDATED_EXPERT_BIO);
        updatedExpertAccount.setExpertSince(UPDATED_EXPERT_SINCE);
        updatedExpertAccount.setNumberOfCases(UPDATED_NUMBER_OF_CASES);

        restExpertAccountMockMvc.perform(put("/api/expert-accounts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedExpertAccount)))
                .andExpect(status().isOk());

        // Validate the ExpertAccount in the database
        List<ExpertAccount> expertAccounts = expertAccountRepository.findAll();
        assertThat(expertAccounts).hasSize(databaseSizeBeforeUpdate);
        ExpertAccount testExpertAccount = expertAccounts.get(expertAccounts.size() - 1);
        assertThat(testExpertAccount.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testExpertAccount.getSkype()).isEqualTo(UPDATED_SKYPE);
        assertThat(testExpertAccount.getOthercommunication()).isEqualTo(UPDATED_OTHERCOMMUNICATION);
        assertThat(testExpertAccount.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testExpertAccount.getExpertScore()).isEqualTo(UPDATED_EXPERT_SCORE);
        assertThat(testExpertAccount.getHandle()).isEqualTo(UPDATED_HANDLE);
        assertThat(testExpertAccount.getLanguages()).isEqualTo(UPDATED_LANGUAGES);
        assertThat(testExpertAccount.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testExpertAccount.getFirstTechnologyPreference()).isEqualTo(UPDATED_FIRST_TECHNOLOGY_PREFERENCE);
        assertThat(testExpertAccount.getSecondTechnologyPreference()).isEqualTo(UPDATED_SECOND_TECHNOLOGY_PREFERENCE);
        assertThat(testExpertAccount.getThirdTechnologyPreference()).isEqualTo(UPDATED_THIRD_TECHNOLOGY_PREFERENCE);
        assertThat(testExpertAccount.isIsAvailable()).isEqualTo(UPDATED_IS_AVAILABLE);
        assertThat(testExpertAccount.getExpertBio()).isEqualTo(UPDATED_EXPERT_BIO);
        assertThat(testExpertAccount.getExpertSince()).isEqualTo(UPDATED_EXPERT_SINCE);
        assertThat(testExpertAccount.getNumberOfCases()).isEqualTo(UPDATED_NUMBER_OF_CASES);
    }

    @Test
    @Transactional
    public void deleteExpertAccount() throws Exception {
        // Initialize the database
        expertAccountRepository.saveAndFlush(expertAccount);
        int databaseSizeBeforeDelete = expertAccountRepository.findAll().size();

        // Get the expertAccount
        restExpertAccountMockMvc.perform(delete("/api/expert-accounts/{id}", expertAccount.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ExpertAccount> expertAccounts = expertAccountRepository.findAll();
        assertThat(expertAccounts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
