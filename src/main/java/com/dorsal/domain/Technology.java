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
 * A Technology.
 */
@Entity
@Table(name = "technology")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Technology implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "technology")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Technologypropertyvalue> technologies = new HashSet<>();

    @OneToMany(mappedBy = "technology")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Referencedoc> referencedocs = new HashSet<>();

    @OneToMany(mappedBy = "technology")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supportcase> supportcases = new HashSet<>();

    @OneToMany(mappedBy = "technology")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Casetechnologyproperty> casetechnologyproperties = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Technologypropertyvalue> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(Set<Technologypropertyvalue> technologypropertyvalues) {
        this.technologies = technologypropertyvalues;
    }

    public Set<Referencedoc> getReferencedocs() {
        return referencedocs;
    }

    public void setReferencedocs(Set<Referencedoc> referencedocs) {
        this.referencedocs = referencedocs;
    }

    public Set<Supportcase> getSupportcases() {
        return supportcases;
    }

    public void setSupportcases(Set<Supportcase> supportcases) {
        this.supportcases = supportcases;
    }

    public Set<Casetechnologyproperty> getCasetechnologyproperties() {
        return casetechnologyproperties;
    }

    public void setCasetechnologyproperties(Set<Casetechnologyproperty> casetechnologyproperties) {
        this.casetechnologyproperties = casetechnologyproperties;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Technology technology = (Technology) o;
        if(technology.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, technology.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Technology{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", code='" + code + "'" +
            '}';
    }
}
