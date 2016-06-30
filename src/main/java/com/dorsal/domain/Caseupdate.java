package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Caseupdate.
 */
@Entity
@Table(name = "caseupdate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Caseupdate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "date_updated")
    private ZonedDateTime dateUpdated;

    @Size(max = 2048)
    @Column(name = "update_msg", length = 2048)
    private String updateMsg;

    @Size(max = 1024)
    @Column(name = "url", length = 1024)
    private String url;

    @ManyToOne
    private User user;

    @ManyToOne
    private Supportcase supportcase;

    @ManyToOne
    private Updatetype updatetype;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(ZonedDateTime dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public String getUpdateMsg() {
        return updateMsg;
    }

    public void setUpdateMsg(String updateMsg) {
        this.updateMsg = updateMsg;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Supportcase getSupportcase() {
        return supportcase;
    }

    public void setSupportcase(Supportcase supportcase) {
        this.supportcase = supportcase;
    }

    public Updatetype getUpdatetype() {
        return updatetype;
    }

    public void setUpdatetype(Updatetype updatetype) {
        this.updatetype = updatetype;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Caseupdate caseupdate = (Caseupdate) o;
        if(caseupdate.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, caseupdate.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Caseupdate{" +
            "id=" + id +
            ", dateUpdated='" + dateUpdated + "'" +
            ", updateMsg='" + updateMsg + "'" +
            ", url='" + url + "'" +
            '}';
    }
}
