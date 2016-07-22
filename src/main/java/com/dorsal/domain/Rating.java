package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Rating.
 */
@Entity
@Table(name = "rating")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "date_rated")
    private ZonedDateTime dateRated;

    @Column(name = "score")
    private Integer score;

    @Column(name = "rate_details")
    private String rateDetails;

    @Column(name = "has_expert_exceeded")
    private Boolean hasExpertExceeded;

    @Size(max = 1024)
    @Column(name = "rating_comments", length = 1024)
    private String ratingComments;

    @ManyToOne
    private Supportcase supportcase;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateRated() {
        return dateRated;
    }

    public void setDateRated(ZonedDateTime dateRated) {
        this.dateRated = dateRated;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getRateDetails() {
        return rateDetails;
    }

    public void setRateDetails(String rateDetails) {
        this.rateDetails = rateDetails;
    }

    public Boolean isHasExpertExceeded() {
        return hasExpertExceeded;
    }

    public void setHasExpertExceeded(Boolean hasExpertExceeded) {
        this.hasExpertExceeded = hasExpertExceeded;
    }

    public String getRatingComments() {
        return ratingComments;
    }

    public void setRatingComments(String ratingComments) {
        this.ratingComments = ratingComments;
    }

    public Supportcase getSupportcase() {
        return supportcase;
    }

    public void setSupportcase(Supportcase supportcase) {
        this.supportcase = supportcase;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rating rating = (Rating) o;
        if(rating.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, rating.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Rating{" +
            "id=" + id +
            ", dateRated='" + dateRated + "'" +
            ", score='" + score + "'" +
            ", rateDetails='" + rateDetails + "'" +
            ", hasExpertExceeded='" + hasExpertExceeded + "'" +
            ", ratingComments='" + ratingComments + "'" +
            '}';
    }
}
