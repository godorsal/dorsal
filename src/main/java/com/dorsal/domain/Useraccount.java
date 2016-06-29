package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Useraccount.
 */
@Entity
@Table(name = "useraccount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Useraccount implements Serializable {

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

    @Column(name = "score")
    private Integer score;

    @Column(name = "isexpert")
    private Boolean isexpert;

    @Column(name = "preferlocalexpert")
    private Boolean preferlocalexpert;

    @Column(name = "handle")
    private String handle;

    @Column(name = "languages")
    private String languages;

    @Column(name = "companyname")
    private String companyname;

    @Column(name = "technologypreference")
    private String technologypreference;

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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Boolean isIsexpert() {
        return isexpert;
    }

    public void setIsexpert(Boolean isexpert) {
        this.isexpert = isexpert;
    }

    public Boolean isPreferlocalexpert() {
        return preferlocalexpert;
    }

    public void setPreferlocalexpert(Boolean preferlocalexpert) {
        this.preferlocalexpert = preferlocalexpert;
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

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getTechnologypreference() {
        return technologypreference;
    }

    public void setTechnologypreference(String technologypreference) {
        this.technologypreference = technologypreference;
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
        Useraccount useraccount = (Useraccount) o;
        if(useraccount.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, useraccount.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Useraccount{" +
            "id=" + id +
            ", phone='" + phone + "'" +
            ", skype='" + skype + "'" +
            ", othercommunication='" + othercommunication + "'" +
            ", location='" + location + "'" +
            ", score='" + score + "'" +
            ", isexpert='" + isexpert + "'" +
            ", preferlocalexpert='" + preferlocalexpert + "'" +
            ", handle='" + handle + "'" +
            ", languages='" + languages + "'" +
            ", companyname='" + companyname + "'" +
            ", technologypreference='" + technologypreference + "'" +
            '}';
    }
}
