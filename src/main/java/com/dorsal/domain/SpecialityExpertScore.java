package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SpecialityExpertScore.
 */
@Entity
@Table(name = "speciality_expert_score")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SpecialityExpertScore implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "score")
    private Integer score;

    @ManyToOne
    public ExpertAccount expertaccount;
    // private ExpertAccount expertaccount;

    @ManyToOne
    public Speciality speciality;
    // private Speciality speciality;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public SpecialityExpertScore score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public SpecialityExpertScore expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public Speciality getSpeciality() {
        return speciality;
    }

    public SpecialityExpertScore speciality(Speciality speciality) {
        this.speciality = speciality;
        return this;
    }

    public void setSpeciality(Speciality speciality) {
        this.speciality = speciality;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SpecialityExpertScore specialityExpertScore = (SpecialityExpertScore) o;
        if(specialityExpertScore.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, specialityExpertScore.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SpecialityExpertScore{" +
            "id=" + id +
            ", score='" + score + "'" +
            '}';
    }
}
