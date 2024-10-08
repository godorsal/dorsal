package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Expertbadge.
 */
@Entity
@Table(name = "expertbadge")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Expertbadge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "expert_badge_count")
    private Integer expertBadgeCount;

    @ManyToOne
    private ExpertAccount expertaccount;

    @ManyToOne
    private Badge badge;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getExpertBadgeCount() {
        return expertBadgeCount;
    }

    public void setExpertBadgeCount(Integer expertBadgeCount) {
        this.expertBadgeCount = expertBadgeCount;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public Badge getBadge() {
        return badge;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Expertbadge expertbadge = (Expertbadge) o;
        if(expertbadge.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expertbadge.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Expertbadge{" +
            "id=" + id +
            ", expertBadgeCount='" + expertBadgeCount + "'" +
            '}';
    }
}
