package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Technologypropertyvalue.
 */
@Entity
@Table(name = "technologypropertyvalue")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Technologypropertyvalue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    private Technology technology;

    @ManyToOne
    private Technologyproperty technologyproperty;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Technology getTechnology() {
        return technology;
    }

    public void setTechnology(Technology technology) {
        this.technology = technology;
    }

    public Technologyproperty getTechnologyproperty() {
        return technologyproperty;
    }

    public void setTechnologyproperty(Technologyproperty technologyproperty) {
        this.technologyproperty = technologyproperty;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Technologypropertyvalue technologypropertyvalue = (Technologypropertyvalue) o;
        if(technologypropertyvalue.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, technologypropertyvalue.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Technologypropertyvalue{" +
            "id=" + id +
            ", value='" + value + "'" +
            '}';
    }
}
