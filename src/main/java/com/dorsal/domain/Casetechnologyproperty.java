package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Casetechnologyproperty.
 */
@Entity
@Table(name = "casetechnologyproperty")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Casetechnologyproperty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "propertyname")
    private String propertyname;

    @Column(name = "propertyvalue")
    private String propertyvalue;

    @ManyToOne
    private Supportcase supportcase;

    @ManyToOne
    private Technology technology;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPropertyname() {
        return propertyname;
    }

    public void setPropertyname(String propertyname) {
        this.propertyname = propertyname;
    }

    public String getPropertyvalue() {
        return propertyvalue;
    }

    public void setPropertyvalue(String propertyvalue) {
        this.propertyvalue = propertyvalue;
    }

    public Supportcase getSupportcase() {
        return supportcase;
    }

    public void setSupportcase(Supportcase supportcase) {
        this.supportcase = supportcase;
    }

    public Technology getTechnology() {
        return technology;
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
        Casetechnologyproperty casetechnologyproperty = (Casetechnologyproperty) o;
        if(casetechnologyproperty.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, casetechnologyproperty.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Casetechnologyproperty{" +
            "id=" + id +
            ", propertyname='" + propertyname + "'" +
            ", propertyvalue='" + propertyvalue + "'" +
            '}';
    }
}
