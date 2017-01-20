package com.dorsal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Skill.
 */
@Entity
@Table(name = "skill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Skill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 512)
    @Column(name = "name", length = 512, nullable = false)
    private String name;

    @Size(max = 512)
    @Column(name = "code", length = 512)
    private String code;

    @OneToMany(mappedBy = "skill")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SkillExpertScore> skillexpertscores = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Skill name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public Skill code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<SkillExpertScore> getSkillexpertscores() {
        return skillexpertscores;
    }

    public Skill skillexpertscores(Set<SkillExpertScore> skillExpertScores) {
        this.skillexpertscores = skillExpertScores;
        return this;
    }

    public Skill addSkillexpertscore(SkillExpertScore skillExpertScore) {
        skillexpertscores.add(skillExpertScore);
        skillExpertScore.setSkill(this);
        return this;
    }

    public Skill removeSkillexpertscore(SkillExpertScore skillExpertScore) {
        skillexpertscores.remove(skillExpertScore);
        skillExpertScore.setSkill(null);
        return this;
    }

    public void setSkillexpertscores(Set<SkillExpertScore> skillExpertScores) {
        this.skillexpertscores = skillExpertScores;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Skill skill = (Skill) o;
        if(skill.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, skill.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Skill{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", code='" + code + "'" +
            '}';
    }
}
