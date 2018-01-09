package com.dorsal.security.social;

import com.dorsal.config.JHipsterProperties;
import com.dorsal.security.jwt.TokenProvider;

import com.dorsal.domain.ExpertAccount;


import com.dorsal.repository.UserRepository;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.TechnologyRepository;
import com.dorsal.repository.ProductRepository;
import com.dorsal.repository.JobRoleRepository;
import com.dorsal.repository.SkillRepository;
import com.dorsal.repository.SpecialityRepository;

import com.dorsal.repository.TechnologyExpertScoreRepository;
import com.dorsal.domain.TechnologyExpertScore;

import com.dorsal.repository.JobroleExpertScoreRepository;
import com.dorsal.domain.JobroleExpertScore;

import com.dorsal.repository.ProductExpertScoreRepository;
import com.dorsal.domain.ProductExpertScore;

import com.dorsal.repository.SkillExpertScoreRepository;
import com.dorsal.domain.SkillExpertScore;

import com.dorsal.repository.SpecialityExpertScoreRepository;
import com.dorsal.domain.SpecialityExpertScore;

import com.dorsal.domain.User;
import com.dorsal.domain.Technology;
import com.dorsal.domain.Product;
import com.dorsal.domain.JobRole;
import com.dorsal.domain.Skill;
import com.dorsal.domain.Speciality;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.context.request.ServletWebRequest;
import javax.servlet.http.Cookie;

import javax.inject.Inject;

public class CustomSignInAdapter implements SignInAdapter {



    @SuppressWarnings("unused")
    private final Logger log = LoggerFactory.getLogger(CustomSignInAdapter.class);

    @Inject
    private UserDetailsService userDetailsService;

    @Inject
    private JHipsterProperties jHipsterProperties;

    @Inject
    private TokenProvider tokenProvider;
    @Inject
    private UserRepository userRepository;
    @Inject
    private ExpertAccountRepository expertRepository;
    @Inject
    private TechnologyExpertScoreRepository technologyExpertScoreRepository;
    @Inject
    private TechnologyRepository technologyRepository;
    @Inject
    private ProductExpertScoreRepository productExpertScoreRepository;
    @Inject
    private ProductRepository productRepository;
    @Inject
    private JobroleExpertScoreRepository jobRoleExpertScoreRepository;
    @Inject
    private JobRoleRepository jobRoleRepository;
    @Inject
    private SkillExpertScoreRepository skillExpertScoreRepository;
    @Inject
    private SkillRepository skillRepository;
    @Inject
    private SpecialityExpertScoreRepository specialityExpertScoreRepository;
    @Inject
    private SpecialityRepository specialityRepository;

    // @Inject
    // private ExpertAccount expertAccount;

    // @Inject
    // private User user;


    @Override
    public String signIn(String userId, Connection<?> connection, NativeWebRequest request){
        try {
            UserDetails user = userDetailsService.loadUserByUsername(userId);

                    if (user != null){
                        ExpertAccount findExpert = expertRepository.findOneByUserLogin(user.getUsername());
                        if(findExpert != null){
                            // log.info("*********** NORPE   *************");
                            createRichProfile(user);
                        } else {
                            createExpertAccount(user);
                        }
                    }
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            String jwt = tokenProvider.createToken(authenticationToken, false);
            ServletWebRequest servletWebRequest = (ServletWebRequest) request;
            servletWebRequest.getResponse().addCookie(getSocialAuthenticationCookie(jwt));
        } catch (AuthenticationException exception) {
            log.error("Social authentication error");
        }
        return jHipsterProperties.getSocial().getRedirectAfterSignIn();
    }
    private void createExpertAccount(UserDetails user) {
        log.info("***********"+user+"*************");
        // Optional<User> account = userRepository.findOneByLogin(user.getUsername());
        User account = userRepository.findOneByLogin(user.getUsername()).get();

        if(account != null){
                ExpertAccount newExpert = new ExpertAccount();
                newExpert.setUser(account);
                expertRepository.save(newExpert);
        }
        return;
    }
    private void createRichProfile(UserDetails user) {
        User userAccount = userRepository.findOneByLogin(user.getUsername()).get();
        ExpertAccount eAccount = expertRepository.findOneByUserLogin(user.getUsername());

        // TechnologyExpertScore newExpertTechScore = new TechnologyExpertScore();

        List<Speciality> specialitylist = specialityRepository.findExpertProfileEntries();
        for (int i = 0; i < specialitylist.size(); i++) {
            SpecialityExpertScore newExpertSpecialityScore = new SpecialityExpertScore();
            newExpertSpecialityScore.speciality = specialitylist.get(i);
            newExpertSpecialityScore.expertaccount = eAccount;
            specialityExpertScoreRepository.save(newExpertSpecialityScore);
		}
        // List<Skill> skilllist = skillRepository.findExpertProfileEntries();
        // for (int i = 0; i < skilllist.size(); i++) {
        //     SkillExpertScore newExpertSkillScore = new SkillExpertScore();
        //     newExpertSkillScore.skill = skilllist.get(i);
        //     newExpertSkillScore.expertaccount = eAccount;
        //     skillExpertScoreRepository.save(newExpertSkillScore);
		// }
        // List<JobRole> rolelist = jobRoleRepository.findExpertProfileEntries();
        // for (int i = 0; i < rolelist.size(); i++) {
        //     JobroleExpertScore newExpertJobRoleScore = new JobroleExpertScore();
        //     newExpertJobRoleScore.jobrole = rolelist.get(i);
        //     newExpertJobRoleScore.expertaccount = eAccount;
        //     jobRoleExpertScoreRepository.save(newExpertJobRoleScore);
		// }
        // List<Product> productlist = productRepository.findExpertProfileEntries();
        // for (int i = 0; i < productlist.size(); i++) {
        //     ProductExpertScore newExpertProductScore = new ProductExpertScore();
        //     newExpertProductScore.product = productlist.get(i);
        //     newExpertProductScore.expertaccount = eAccount;
        //     productExpertScoreRepository.save(newExpertProductScore);
		// }
        // List<Technology> techList = technologyRepository.findExpertProfileEntries();
        // for (int i = 0; i < techList.size(); i++) {
		// 	System.out.println(techList.get(i).getId());
        //     TechnologyExpertScore newExpertTechScore = new TechnologyExpertScore();
        //     newExpertTechScore.technology = techList.get(i);
        //     newExpertTechScore.expertaccount = eAccount;
        //     technologyExpertScoreRepository.save(newExpertTechScore);
		// }

        // newExpertTechScore.technology = 1;
        // newExpertTechScore.expertaccount = eAccount.getId();

        // technologyExpertScoreRepository.save(newExpertTechScore);

        // if(account != null){
        //         ExpertAccount newExpert = new ExpertAccount();
        //         newExpert.setUser(account);
        //         expertRepository.save(newExpert);
        // }

        return;
    }
    private Cookie getSocialAuthenticationCookie(String token) {
        Cookie socialAuthCookie = new Cookie("authenticationToken", token);
        socialAuthCookie.setPath("/");
        socialAuthCookie.setMaxAge(1000);
        return socialAuthCookie;
    }
}
