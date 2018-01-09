package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SkillExpertScore.
 */
@Entity
@Table(name = "skill_expert_score")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SkillExpertScore implements Serializable {

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
    public Skill skill;
    // private Skill skill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public SkillExpertScore score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public SkillExpertScore expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public Skill getSkill() {
        return skill;
    }

    public SkillExpertScore skill(Skill skill) {
        this.skill = skill;
        return this;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SkillExpertScore skillExpertScore = (SkillExpertScore) o;
        if(skillExpertScore.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, skillExpertScore.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SkillExpertScore{" +
            "id=" + id +
            ", score='" + score + "'" +
            '}';
    }
}
