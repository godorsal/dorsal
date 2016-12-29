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

import com.dorsal.domain.enumeration.ExpertSelection;

/**
 * A ExpertPool.
 */
@Entity
@Table(name = "expert_pool")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpertPool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 512)
    @Column(name = "name", length = 512, nullable = false)
    private String name;

    @NotNull
    @Size(max = 512)
    @Column(name = "description", length = 512, nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "expert_selection")
    private ExpertSelection expertSelection;

    @OneToMany(mappedBy = "expertpool")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExpertPoolToExpert> expertpooltoexperts = new HashSet<>();

    @ManyToOne
    private ExpertAccount expertpoolowner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ExpertPool name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public ExpertPool description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ExpertSelection getExpertSelection() {
        return expertSelection;
    }

    public ExpertPool expertSelection(ExpertSelection expertSelection) {
        this.expertSelection = expertSelection;
        return this;
    }

    public void setExpertSelection(ExpertSelection expertSelection) {
        this.expertSelection = expertSelection;
    }

    public Set<ExpertPoolToExpert> getExpertpooltoexperts() {
        return expertpooltoexperts;
    }

    public ExpertPool expertpooltoexperts(Set<ExpertPoolToExpert> expertPoolToExperts) {
        this.expertpooltoexperts = expertPoolToExperts;
        return this;
    }

    public ExpertPool addExpertpooltoexpert(ExpertPoolToExpert expertPoolToExpert) {
        expertpooltoexperts.add(expertPoolToExpert);
        expertPoolToExpert.setExpertpool(this);
        return this;
    }

    public ExpertPool removeExpertpooltoexpert(ExpertPoolToExpert expertPoolToExpert) {
        expertpooltoexperts.remove(expertPoolToExpert);
        expertPoolToExpert.setExpertpool(null);
        return this;
    }

    public void setExpertpooltoexperts(Set<ExpertPoolToExpert> expertPoolToExperts) {
        this.expertpooltoexperts = expertPoolToExperts;
    }

    public ExpertAccount getExpertpoolowner() {
        return expertpoolowner;
    }

    public ExpertPool expertpoolowner(ExpertAccount expertAccount) {
        this.expertpoolowner = expertAccount;
        return this;
    }

    public void setExpertpoolowner(ExpertAccount expertAccount) {
        this.expertpoolowner = expertAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExpertPool expertPool = (ExpertPool) o;
        if(expertPool.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expertPool.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ExpertPool{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            ", expertSelection='" + expertSelection + "'" +
            '}';
    }
}
