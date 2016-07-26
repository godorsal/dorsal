package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A EscalateCase.
 */
@Entity
@Table(name = "escalate_case")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EscalateCase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(max = 4096)
    @Column(name = "reason", length = 4096)
    private String reason;

    @Column(name = "date_escalated")
    private ZonedDateTime dateEscalated;

    @Column(name = "escalation_type")
    private String escalationType;

    @ManyToOne
    private Supportcase supportcase;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public ZonedDateTime getDateEscalated() {
        return dateEscalated;
    }

    public void setDateEscalated(ZonedDateTime dateEscalated) {
        this.dateEscalated = dateEscalated;
    }

    public String getEscalationType() {
        return escalationType;
    }

    public void setEscalationType(String escalationType) {
        this.escalationType = escalationType;
    }

    public Supportcase getSupportcase() {
        return supportcase;
    }

    public void setSupportcase(Supportcase supportcase) {
        this.supportcase = supportcase;
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
        EscalateCase escalateCase = (EscalateCase) o;
        if(escalateCase.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, escalateCase.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EscalateCase{" +
            "id=" + id +
            ", reason='" + reason + "'" +
            ", dateEscalated='" + dateEscalated + "'" +
            ", escalationType='" + escalationType + "'" +
            '}';
    }
}
