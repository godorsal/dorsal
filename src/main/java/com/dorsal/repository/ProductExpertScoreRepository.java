package com.dorsal.repository;

import com.dorsal.domain.ProductExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ProductExpertScore entity.
 */
@SuppressWarnings("unused")
public interface ProductExpertScoreRepository extends JpaRepository<ProductExpertScore,Long> {

}
