package com.dorsal.repository;

import com.dorsal.domain.ProductExpertScore;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ProductExpertScore entity.
 */
@SuppressWarnings("unused")
public interface ProductExpertScoreRepository extends JpaRepository<ProductExpertScore,Long> {

    // Get the list of products for the currently logged in expert
    @Query("select pes from ProductExpertScore pes where pes.expertaccount.user.login = ?#{principal.username} ORDER BY pes.id ASC")
    List<ProductExpertScore> findByUserIsCurrentUser();

    // Get the list of products for the expert id
    @Query("select pes from ProductExpertScore pes where pes.expertaccount.id = :expertid ORDER BY pes.id ASC")
    List<ProductExpertScore> findByExpertId(@Param("expertid") long expertid);
}
