package com.dorsal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dorsal.domain.enumeration.Updateenum;

/**
 * A Updatetype.
 */
@Entity
@Table(name = "updatetype")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Updatetype implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private Updateenum name;

    @OneToMany(mappedBy = "updatetype")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Caseupdate> caseupdates = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Updateenum getName() {
        return name;
    }

    public void setName(Updateenum name) {
        this.name = name;
    }

    public Set<Caseupdate> getCaseupdates() {
        return caseupdates;
    }

    public void setCaseupdates(Set<Caseupdate> caseupdates) {
        this.caseupdates = caseupdates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Updatetype updatetype = (Updatetype) o;
        if(updatetype.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, updatetype.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Updatetype{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
