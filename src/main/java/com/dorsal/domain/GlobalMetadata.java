package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A GlobalMetadata.
 */
@Entity
@Table(name = "global_metadata")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GlobalMetadata implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "expert_rate")
    private Integer expertRate;

    @Column(name = "minimum_case_length")
    private Integer minimumCaseLength;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getExpertRate() {
        return expertRate;
    }

    public void setExpertRate(Integer expertRate) {
        this.expertRate = expertRate;
    }

    public Integer getMinimumCaseLength() {
        return minimumCaseLength;
    }

    public void setMinimumCaseLength(Integer minimumCaseLength) {
        this.minimumCaseLength = minimumCaseLength;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GlobalMetadata globalMetadata = (GlobalMetadata) o;
        if(globalMetadata.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, globalMetadata.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "GlobalMetadata{" +
            "id=" + id +
            ", expertRate='" + expertRate + "'" +
            ", minimumCaseLength='" + minimumCaseLength + "'" +
            '}';
    }
}
