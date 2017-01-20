package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ExpertPoolToExpert.
 */
@Entity
@Table(name = "expert_pool_to_expert")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpertPoolToExpert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private ExpertAccount expertaccount;

    @ManyToOne
    private ExpertPool expertpool;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public ExpertPoolToExpert expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public ExpertPool getExpertpool() {
        return expertpool;
    }

    public ExpertPoolToExpert expertpool(ExpertPool expertPool) {
        this.expertpool = expertPool;
        return this;
    }

    public void setExpertpool(ExpertPool expertPool) {
        this.expertpool = expertPool;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExpertPoolToExpert expertPoolToExpert = (ExpertPoolToExpert) o;
        if(expertPoolToExpert.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expertPoolToExpert.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ExpertPoolToExpert{" +
            "id=" + id +
            '}';
    }
}
