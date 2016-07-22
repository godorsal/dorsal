package com.dorsal.web.rest;

import com.dorsal.DorsalApp;
import com.dorsal.domain.Useraccount;
import com.dorsal.repository.UseraccountRepository;

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
 * Test class for the UseraccountResource REST controller.
 *
 * @see UseraccountResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DorsalApp.class)
@WebAppConfiguration
@IntegrationTest
public class UseraccountResourceIntTest {

    private static final String DEFAULT_LOCATION = "AAAAA";
    private static final String UPDATED_LOCATION = "BBBBB";

    private static final Boolean DEFAULT_PREFERLOCALEXPERT = false;
    private static final Boolean UPDATED_PREFERLOCALEXPERT = true;
    private static final String DEFAULT_HANDLE = "AAAAA";
    private static final String UPDATED_HANDLE = "BBBBB";
    private static final String DEFAULT_COMPANYNAME = "AAAAA";
    private static final String UPDATED_COMPANYNAME = "BBBBB";
    private static final String DEFAULT_INVITE_CONTEXT = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_INVITE_CONTEXT = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

    @Inject
    private UseraccountRepository useraccountRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUseraccountMockMvc;

    private Useraccount useraccount;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UseraccountResource useraccountResource = new UseraccountResource();
        ReflectionTestUtils.setField(useraccountResource, "useraccountRepository", useraccountRepository);
        this.restUseraccountMockMvc = MockMvcBuilders.standaloneSetup(useraccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        useraccount = new Useraccount();
        useraccount.setLocation(DEFAULT_LOCATION);
        useraccount.setPreferlocalexpert(DEFAULT_PREFERLOCALEXPERT);
        useraccount.setHandle(DEFAULT_HANDLE);
        useraccount.setCompanyname(DEFAULT_COMPANYNAME);
        useraccount.setInviteContext(DEFAULT_INVITE_CONTEXT);
    }

    @Test
    @Transactional
    public void createUseraccount() throws Exception {
        int databaseSizeBeforeCreate = useraccountRepository.findAll().size();

        // Create the Useraccount

        restUseraccountMockMvc.perform(post("/api/useraccounts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(useraccount)))
                .andExpect(status().isCreated());

        // Validate the Useraccount in the database
        List<Useraccount> useraccounts = useraccountRepository.findAll();
        assertThat(useraccounts).hasSize(databaseSizeBeforeCreate + 1);
        Useraccount testUseraccount = useraccounts.get(useraccounts.size() - 1);
        assertThat(testUseraccount.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testUseraccount.isPreferlocalexpert()).isEqualTo(DEFAULT_PREFERLOCALEXPERT);
        assertThat(testUseraccount.getHandle()).isEqualTo(DEFAULT_HANDLE);
        assertThat(testUseraccount.getCompanyname()).isEqualTo(DEFAULT_COMPANYNAME);
        assertThat(testUseraccount.getInviteContext()).isEqualTo(DEFAULT_INVITE_CONTEXT);
    }

    @Test
    @Transactional
    public void getAllUseraccounts() throws Exception {
        // Initialize the database
        useraccountRepository.saveAndFlush(useraccount);

        // Get all the useraccounts
        /*restUseraccountMockMvc.perform(get("/api/useraccounts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(useraccount.getId().intValue())))
                .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
                .andExpect(jsonPath("$.[*].preferlocalexpert").value(hasItem(DEFAULT_PREFERLOCALEXPERT.booleanValue())))
                .andExpect(jsonPath("$.[*].handle").value(hasItem(DEFAULT_HANDLE.toString())))
                .andExpect(jsonPath("$.[*].companyname").value(hasItem(DEFAULT_COMPANYNAME.toString())))
                .andExpect(jsonPath("$.[*].inviteContext").value(hasItem(DEFAULT_INVITE_CONTEXT.toString())));
    */
    }

    @Test
    @Transactional
    public void getUseraccount() throws Exception {
        // Initialize the database
        useraccountRepository.saveAndFlush(useraccount);

        // Get the useraccount
        restUseraccountMockMvc.perform(get("/api/useraccounts/{id}", useraccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(useraccount.getId().intValue()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.preferlocalexpert").value(DEFAULT_PREFERLOCALEXPERT.booleanValue()))
            .andExpect(jsonPath("$.handle").value(DEFAULT_HANDLE.toString()))
            .andExpect(jsonPath("$.companyname").value(DEFAULT_COMPANYNAME.toString()))
            .andExpect(jsonPath("$.inviteContext").value(DEFAULT_INVITE_CONTEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUseraccount() throws Exception {
        // Get the useraccount
        restUseraccountMockMvc.perform(get("/api/useraccounts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUseraccount() throws Exception {
        // Initialize the database
        useraccountRepository.saveAndFlush(useraccount);
        int databaseSizeBeforeUpdate = useraccountRepository.findAll().size();

        // Update the useraccount
        Useraccount updatedUseraccount = new Useraccount();
        updatedUseraccount.setId(useraccount.getId());
        updatedUseraccount.setLocation(UPDATED_LOCATION);
        updatedUseraccount.setPreferlocalexpert(UPDATED_PREFERLOCALEXPERT);
        updatedUseraccount.setHandle(UPDATED_HANDLE);
        updatedUseraccount.setCompanyname(UPDATED_COMPANYNAME);
        updatedUseraccount.setInviteContext(UPDATED_INVITE_CONTEXT);

        restUseraccountMockMvc.perform(put("/api/useraccounts")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedUseraccount)))
                .andExpect(status().isOk());

        // Validate the Useraccount in the database
        List<Useraccount> useraccounts = useraccountRepository.findAll();
        assertThat(useraccounts).hasSize(databaseSizeBeforeUpdate);
        Useraccount testUseraccount = useraccounts.get(useraccounts.size() - 1);
        assertThat(testUseraccount.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testUseraccount.isPreferlocalexpert()).isEqualTo(UPDATED_PREFERLOCALEXPERT);
        assertThat(testUseraccount.getHandle()).isEqualTo(UPDATED_HANDLE);
        assertThat(testUseraccount.getCompanyname()).isEqualTo(UPDATED_COMPANYNAME);
        assertThat(testUseraccount.getInviteContext()).isEqualTo(UPDATED_INVITE_CONTEXT);
    }

    @Test
    @Transactional
    public void deleteUseraccount() throws Exception {
        // Initialize the database
        useraccountRepository.saveAndFlush(useraccount);
        int databaseSizeBeforeDelete = useraccountRepository.findAll().size();

        // Get the useraccount
        restUseraccountMockMvc.perform(delete("/api/useraccounts/{id}", useraccount.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Useraccount> useraccounts = useraccountRepository.findAll();
        assertThat(useraccounts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
