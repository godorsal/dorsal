package com.dorsal.repository;

import com.dorsal.domain.ProductExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ProductExpertScore entity.
 */
@SuppressWarnings("unused")
public interface ProductExpertScoreRepository extends JpaRepository<ProductExpertScore,Long> {

    // Get the list of products for the currently logged in expert
    @Query("select pes from ProductExpertScore pes where pes.expertaccount.user.login = ?#{principal.username} ORDER BY pes.id ASC")
    List<ProductExpertScore> findByUserIsCurrentUser();
}
