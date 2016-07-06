package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Useraccount.
 */
@Entity
@Table(name = "useraccount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Useraccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "location")
    private String location;

    @Column(name = "preferlocalexpert")
    private Boolean preferlocalexpert;

    @Column(name = "handle")
    private String handle;

    @Column(name = "companyname")
    private String companyname;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean isPreferlocalexpert() {
        return preferlocalexpert;
    }

    public void setPreferlocalexpert(Boolean preferlocalexpert) {
        this.preferlocalexpert = preferlocalexpert;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Useraccount useraccount = (Useraccount) o;
        if(useraccount.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, useraccount.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Useraccount{" +
            "id=" + id +
            ", location='" + location + "'" +
            ", preferlocalexpert='" + preferlocalexpert + "'" +
            ", handle='" + handle + "'" +
            ", companyname='" + companyname + "'" +
            '}';
    }
}
