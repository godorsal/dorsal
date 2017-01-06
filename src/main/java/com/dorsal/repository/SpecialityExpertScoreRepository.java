package com.dorsal.repository;

import com.dorsal.domain.SpecialityExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SpecialityExpertScore entity.
 */
@SuppressWarnings("unused")
public interface SpecialityExpertScoreRepository extends JpaRepository<SpecialityExpertScore,Long> {
    // Get the list of skill for the currently logged in expert
    @Query("select ses from SpecialityExpertScore ses where ses.expertaccount.user.login = ?#{principal.username} ORDER BY ses.id ASC")
    List<SpecialityExpertScore> findByUserIsCurrentUser();
}
