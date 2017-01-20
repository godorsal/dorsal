package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ExpertAttributeToExpert.
 */
@Entity
@Table(name = "expert_attribute_to_expert")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpertAttributeToExpert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private ExpertAccount expertaccount;

    @ManyToOne
    private ExpertAttribute expertattribute;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public ExpertAttributeToExpert expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public ExpertAttribute getExpertattribute() {
        return expertattribute;
    }

    public ExpertAttributeToExpert expertattribute(ExpertAttribute expertAttribute) {
        this.expertattribute = expertAttribute;
        return this;
    }

    public void setExpertattribute(ExpertAttribute expertAttribute) {
        this.expertattribute = expertAttribute;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExpertAttributeToExpert expertAttributeToExpert = (ExpertAttributeToExpert) o;
        if(expertAttributeToExpert.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, expertAttributeToExpert.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ExpertAttributeToExpert{" +
            "id=" + id +
            '}';
    }
}
