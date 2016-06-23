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

/**
 * A Supportcase.
 */
@Entity
@Table(name = "supportcase")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Supportcase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(max = 1024)
    @Column(name = "summary", length = 1024)
    private String summary;

    @Size(max = 1024)
    @Column(name = "expectedresult", length = 1024)
    private String expectedresult;

    @Column(name = "statusmsg")
    private String statusmsg;

    @Column(name = "datecreated")
    private ZonedDateTime datecreated;

    @Column(name = "datelastupdate")
    private ZonedDateTime datelastupdate;

    @Size(max = 1024)
    @Column(name = "chaturl", length = 1024)
    private String chaturl;

    @Column(name = "etacompletion")
    private String etacompletion;

    @OneToMany(mappedBy = "supportcase")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Casetechnologyproperty> casetechnologyproperties = new HashSet<>();

    @OneToMany(mappedBy = "supportcase")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Caseupdate> caseupdates = new HashSet<>();

    @OneToMany(mappedBy = "supportcase")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rating> ratings = new HashSet<>();

    @OneToMany(mappedBy = "supportcase")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attachement> attachements = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private User expert;

    @ManyToOne
    private Technology technology;

    @ManyToOne
    private Status status;

    @ManyToOne
    private Issue issue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getExpectedresult() {
        return expectedresult;
    }

    public void setExpectedresult(String expectedresult) {
        this.expectedresult = expectedresult;
    }

    public String getStatusmsg() {
        return statusmsg;
    }

    public void setStatusmsg(String statusmsg) {
        this.statusmsg = statusmsg;
    }

    public ZonedDateTime getDatecreated() {
        return datecreated;
    }

    public void setDatecreated(ZonedDateTime datecreated) {
        this.datecreated = datecreated;
    }

    public ZonedDateTime getDatelastupdate() {
        return datelastupdate;
    }

    public void setDatelastupdate(ZonedDateTime datelastupdate) {
        this.datelastupdate = datelastupdate;
    }

    public String getChaturl() {
        return chaturl;
    }

    public void setChaturl(String chaturl) {
        this.chaturl = chaturl;
    }

    public String getEtacompletion() {
        return etacompletion;
    }

    public void setEtacompletion(String etacompletion) {
        this.etacompletion = etacompletion;
    }

    public Set<Casetechnologyproperty> getCasetechnologyproperties() {
        return casetechnologyproperties;
    }

    public void setCasetechnologyproperties(Set<Casetechnologyproperty> casetechnologyproperties) {
        this.casetechnologyproperties = casetechnologyproperties;
    }

    public Set<Caseupdate> getCaseupdates() {
        return caseupdates;
    }

    public void setCaseupdates(Set<Caseupdate> caseupdates) {
        this.caseupdates = caseupdates;
    }

    public Set<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public Set<Attachement> getAttachements() {
        return attachements;
    }

    public void setAttachements(Set<Attachement> attachements) {
        this.attachements = attachements;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getExpert() {
        return expert;
    }

    public void setExpert(User user) {
        this.expert = user;
    }

    public Technology getTechnology() {
        return technology;
    }

    public void setTechnology(Technology technology) {
        this.technology = technology;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Supportcase supportcase = (Supportcase) o;
        if(supportcase.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, supportcase.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Supportcase{" +
            "id=" + id +
            ", summary='" + summary + "'" +
            ", expectedresult='" + expectedresult + "'" +
            ", statusmsg='" + statusmsg + "'" +
            ", datecreated='" + datecreated + "'" +
            ", datelastupdate='" + datelastupdate + "'" +
            ", chaturl='" + chaturl + "'" +
            ", etacompletion='" + etacompletion + "'" +
            '}';
    }
}
