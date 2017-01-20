package com.dorsal.repository;

import com.dorsal.domain.TechnologyExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TechnologyExpertScore entity.
 */
@SuppressWarnings("unused")
public interface TechnologyExpertScoreRepository extends JpaRepository<TechnologyExpertScore,Long> {
    // Get the list of skill for the currently logged in expert
    @Query("select tes from TechnologyExpertScore tes where tes.expertaccount.user.login = ?#{principal.username} ORDER BY tes.id ASC")
    List<TechnologyExpertScore> findByUserIsCurrentUser();
}
