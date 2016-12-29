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
 * A JobRole.
 */
@Entity
@Table(name = "job_role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JobRole implements Serializable {

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

    @OneToMany(mappedBy = "jobrole")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<JobroleExpertScore> jobroleexpertscores = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public JobRole name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public JobRole code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<JobroleExpertScore> getJobroleexpertscores() {
        return jobroleexpertscores;
    }

    public JobRole jobroleexpertscores(Set<JobroleExpertScore> jobroleExpertScores) {
        this.jobroleexpertscores = jobroleExpertScores;
        return this;
    }

    public JobRole addJobroleexpertscore(JobroleExpertScore jobroleExpertScore) {
        jobroleexpertscores.add(jobroleExpertScore);
        jobroleExpertScore.setJobrole(this);
        return this;
    }

    public JobRole removeJobroleexpertscore(JobroleExpertScore jobroleExpertScore) {
        jobroleexpertscores.remove(jobroleExpertScore);
        jobroleExpertScore.setJobrole(null);
        return this;
    }

    public void setJobroleexpertscores(Set<JobroleExpertScore> jobroleExpertScores) {
        this.jobroleexpertscores = jobroleExpertScores;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        JobRole jobRole = (JobRole) o;
        if(jobRole.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, jobRole.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "JobRole{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", code='" + code + "'" +
            '}';
    }
}
