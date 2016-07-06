package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

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

    @Column(name = "first_technology_preference")
    private String firstTechnologyPreference;

    @Column(name = "second_technology_preference")
    private String secondTechnologyPreference;

    @Column(name = "third_technology_preference")
    private String thirdTechnologyPreference;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

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

    public String getFirstTechnologyPreference() {
        return firstTechnologyPreference;
    }

    public void setFirstTechnologyPreference(String firstTechnologyPreference) {
        this.firstTechnologyPreference = firstTechnologyPreference;
    }

    public String getSecondTechnologyPreference() {
        return secondTechnologyPreference;
    }

    public void setSecondTechnologyPreference(String secondTechnologyPreference) {
        this.secondTechnologyPreference = secondTechnologyPreference;
    }

    public String getThirdTechnologyPreference() {
        return thirdTechnologyPreference;
    }

    public void setThirdTechnologyPreference(String thirdTechnologyPreference) {
        this.thirdTechnologyPreference = thirdTechnologyPreference;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
            ", firstTechnologyPreference='" + firstTechnologyPreference + "'" +
            ", secondTechnologyPreference='" + secondTechnologyPreference + "'" +
            ", thirdTechnologyPreference='" + thirdTechnologyPreference + "'" +
            '}';
    }
}
