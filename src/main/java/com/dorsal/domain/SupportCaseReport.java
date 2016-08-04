package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A SupportCaseReport.
 */
@Entity
@Table(name = "support_case_report")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupportCaseReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "is_paid")
    private Boolean isPaid;

    @Column(name = "date_paid")
    private ZonedDateTime datePaid;

    @Size(max = 4096)
    @Column(name = "comments", length = 4096)
    private String comments;

    @ManyToOne
    private Supportcase supportcase;

    @ManyToOne
    private Rating rating;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsPaid() {
        return isPaid;
    }

    public void setIsPaid(Boolean isPaid) {
        this.isPaid = isPaid;
    }

    public ZonedDateTime getDatePaid() {
        return datePaid;
    }

    public void setDatePaid(ZonedDateTime datePaid) {
        this.datePaid = datePaid;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Supportcase getSupportcase() {
        return supportcase;
    }

    public void setSupportcase(Supportcase supportcase) {
        this.supportcase = supportcase;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SupportCaseReport supportCaseReport = (SupportCaseReport) o;
        if(supportCaseReport.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, supportCaseReport.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SupportCaseReport{" +
            "id=" + id +
            ", isPaid='" + isPaid + "'" +
            ", datePaid='" + datePaid + "'" +
            ", comments='" + comments + "'" +
            '}';
    }
}
