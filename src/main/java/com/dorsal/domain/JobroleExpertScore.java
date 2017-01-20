package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A JobroleExpertScore.
 */
@Entity
@Table(name = "jobrole_expert_score")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JobroleExpertScore implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "score")
    private Integer score;

    @ManyToOne
    private ExpertAccount expertaccount;

    @ManyToOne
    private JobRole jobrole;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public JobroleExpertScore score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public JobroleExpertScore expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public JobRole getJobrole() {
        return jobrole;
    }

    public JobroleExpertScore jobrole(JobRole jobRole) {
        this.jobrole = jobRole;
        return this;
    }

    public void setJobrole(JobRole jobRole) {
        this.jobrole = jobRole;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        JobroleExpertScore jobroleExpertScore = (JobroleExpertScore) o;
        if(jobroleExpertScore.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, jobroleExpertScore.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "JobroleExpertScore{" +
            "id=" + id +
            ", score='" + score + "'" +
            '}';
    }
}
