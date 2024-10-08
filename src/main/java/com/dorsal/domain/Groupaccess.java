package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Groupaccess.
 */
@Entity
@Table(name = "groupaccess")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Groupaccess implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User authorizeduser;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthorizeduser() {
        return authorizeduser;
    }

    public void setAuthorizeduser(User user) {
        this.authorizeduser = user;
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
        Groupaccess groupaccess = (Groupaccess) o;
        if(groupaccess.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, groupaccess.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Groupaccess{" +
            "id=" + id +
            '}';
    }
}
