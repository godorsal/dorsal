package com.dorsal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dorsal.domain.enumeration.Availability;

import com.dorsal.domain.enumeration.ProfileVisability;

/**
 * A ExpertAccount.
 */
@Entity
@Table(name = "expert_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpertAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "skype")
    private String skype;

    @Column(name = "othercommunication")
    private String othercommunication;

    @Column(name = "location")
    private String location;

    @Column(name = "expert_score")
    private Integer expertScore;

    @Column(name = "handle")
    private String handle;

    @Column(name = "languages")
    private String languages;

    @Size(max = 512)
    @Column(name = "image_path", length = 512)
    private String imagePath;

    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "authorized")
    private Boolean authorized;

    @Size(max = 4096)
    @Column(name = "expert_bio", length = 4096)
    private String expertBio;

    @Column(name = "expert_since")
    private ZonedDateTime expertSince;

    @Column(name = "number_of_cases")
    private Integer numberOfCases;

    @Size(max = 2048)
    @Column(name = "welcome_message", length = 2048)
    private String welcomeMessage;

    @Column(name = "expert_timezone")
    private String expertTimezone;

    @Enumerated(EnumType.STRING)
    @Column(name = "expert_availability")
    private Availability expertAvailability;

    @Enumerated(EnumType.STRING)
    @Column(name = "profile_visibility")
    private ProfileVisability profileVisibility;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "preferredexpert")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Useraccount> useraccounts = new HashSet<>();

    @OneToMany(mappedBy = "expertaccount")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supportcase> supportcases = new HashSet<>();

    @ManyToOne
    private Technology firsttechnology;

    @ManyToOne
    private Technology secondtechnology;

    @ManyToOne
    private Issue issueexpertise;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSkype() {
        return skype;
    }

    public void setSkype(String skype) {
        this.skype = skype;
    }

    public String getOthercommunication() {
        return othercommunication;
    }

    public void setOthercommunication(String othercommunication) {
        this.othercommunication = othercommunication;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getExpertScore() {
        return expertScore;
    }

    public void setExpertScore(Integer expertScore) {
        this.expertScore = expertScore;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Boolean isIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getExpertBio() {
        return expertBio;
    }

    public void setExpertBio(String expertBio) {
        this.expertBio = expertBio;
    }

    public ZonedDateTime getExpertSince() {
        return expertSince;
    }

    public void setExpertSince(ZonedDateTime expertSince) {
        this.expertSince = expertSince;
    }

    public Integer getNumberOfCases() {
        return numberOfCases;
    }

    public void setNumberOfCases(Integer numberOfCases) {
        this.numberOfCases = numberOfCases;
    }

    public String getWelcomeMessage() {
        return welcomeMessage;
    }

    public void setWelcomeMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public String getExpertTimezone() {
        return expertTimezone;
    }

    public void setExpertTimezone(String expertTimezone) {
        this.expertTimezone = expertTimezone;
    }

    public Availability getExpertAvailability() {
        return expertAvailability;
    }

    public void setExpertAvailability(Availability expertAvailability) {
        this.expertAvailability = expertAvailability;
    }

    public ProfileVisability getProfileVisibility() {
        return profileVisibility;
    }

    public void setProfileVisibility(ProfileVisability profileVisibility) {
        this.profileVisibility = profileVisibility;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Useraccount> getUseraccounts() {
        return useraccounts;
    }

    public void setUseraccounts(Set<Useraccount> useraccounts) {
        this.useraccounts = useraccounts;
    }

    public Set<Supportcase> getSupportcases() {
        return supportcases;
    }

    public void setSupportcases(Set<Supportcase> supportcases) {
        this.supportcases = supportcases;
    }

    public Technology getFirsttechnology() {
        return firsttechnology;
    }

    public void setFirsttechnology(Technology technology) {
        this.firsttechnology = technology;
    }

    public Technology getSecondtechnology() {
        return secondtechnology;
    }

    public void setSecondtechnology(Technology technology) {
        this.secondtechnology = technology;
    }

    public Issue getIssueexpertise() {
        return issueexpertise;
    }

    public void setIssueexpertise(Issue issue) {
        this.issueexpertise = issue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExpertAccount expertAccount = (ExpertAccount) o;
        if(expertAccount.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expertAccount.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ExpertAccount{" +
            "id=" + id +
            ", phone='" + phone + "'" +
            ", skype='" + skype + "'" +
            ", othercommunication='" + othercommunication + "'" +
            ", location='" + location + "'" +
            ", expertScore='" + expertScore + "'" +
            ", handle='" + handle + "'" +
            ", languages='" + languages + "'" +
            ", imagePath='" + imagePath + "'" +
            ", isAvailable='" + isAvailable + "'" +
            ", expertBio='" + expertBio + "'" +
            ", expertSince='" + expertSince + "'" +
            ", numberOfCases='" + numberOfCases + "'" +
            ", welcomeMessage='" + welcomeMessage + "'" +
            ", expertTimezone='" + expertTimezone + "'" +
            ", expertAvailability='" + expertAvailability + "'" +
            ", profileVisibility='" + profileVisibility + "'" +
            '}';
    }
}
