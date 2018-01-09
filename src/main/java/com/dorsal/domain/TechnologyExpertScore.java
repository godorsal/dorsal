package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TechnologyExpertScore.
 */
@Entity
@Table(name = "technology_expert_score")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TechnologyExpertScore implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "score")
    public Integer score;
    // private Integer score;

    @ManyToOne
    public ExpertAccount expertaccount;
    // private ExpertAccount expertaccount;

    @ManyToOne
    public Technology technology;
    // private Technology technology;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public TechnologyExpertScore score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public TechnologyExpertScore expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public Technology getTechnology() {
        return technology;
    }

    public TechnologyExpertScore technology(Technology technology) {
        this.technology = technology;
        return this;
    }

    public void setTechnology(Technology technology) {
        this.technology = technology;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TechnologyExpertScore technologyExpertScore = (TechnologyExpertScore) o;
        if(technologyExpertScore.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, technologyExpertScore.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "TechnologyExpertScore{" +
            "id=" + id +
            ", score='" + score + "'" +
            '}';
    }
}
