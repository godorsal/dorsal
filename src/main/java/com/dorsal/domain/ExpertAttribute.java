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
 * A ExpertAttribute.
 */
@Entity
@Table(name = "expert_attribute")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpertAttribute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 512)
    @Column(name = "name", length = 512, nullable = false)
    private String name;

    @Size(max = 512)
    @Column(name = "description", length = 512)
    private String description;

    @OneToMany(mappedBy = "expertattribute")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExpertAttributeToExpert> expertattributetoexperts = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ExpertAttribute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public ExpertAttribute description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ExpertAttributeToExpert> getExpertattributetoexperts() {
        return expertattributetoexperts;
    }

    public ExpertAttribute expertattributetoexperts(Set<ExpertAttributeToExpert> expertAttributeToExperts) {
        this.expertattributetoexperts = expertAttributeToExperts;
        return this;
    }

    public ExpertAttribute addExpertattributetoexpert(ExpertAttributeToExpert expertAttributeToExpert) {
        expertattributetoexperts.add(expertAttributeToExpert);
        expertAttributeToExpert.setExpertattribute(this);
        return this;
    }

    public ExpertAttribute removeExpertattributetoexpert(ExpertAttributeToExpert expertAttributeToExpert) {
        expertattributetoexperts.remove(expertAttributeToExpert);
        expertAttributeToExpert.setExpertattribute(null);
        return this;
    }

    public void setExpertattributetoexperts(Set<ExpertAttributeToExpert> expertAttributeToExperts) {
        this.expertattributetoexperts = expertAttributeToExperts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExpertAttribute expertAttribute = (ExpertAttribute) o;
        if(expertAttribute.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expertAttribute.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ExpertAttribute{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
