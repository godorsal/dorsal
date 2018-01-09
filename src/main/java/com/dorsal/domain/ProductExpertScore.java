package com.dorsal.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductExpertScore.
 */
@Entity
@Table(name = "product_expert_score")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductExpertScore implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "score")
    public Integer score;
    // private Integer score;

    @ManyToOne
    public ExpertAccount expertaccount;
    // private ExpertAccount expertaccount;

    @ManyToOne
    public Product product;
    // private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public ProductExpertScore score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public ExpertAccount getExpertaccount() {
        return expertaccount;
    }

    public ProductExpertScore expertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
        return this;
    }

    public void setExpertaccount(ExpertAccount expertAccount) {
        this.expertaccount = expertAccount;
    }

    public Product getProduct() {
        return product;
    }

    public ProductExpertScore product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductExpertScore productExpertScore = (ProductExpertScore) o;
        if(productExpertScore.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, productExpertScore.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ProductExpertScore{" +
            "id=" + id +
            ", score='" + score + "'" +
            '}';
    }
}
