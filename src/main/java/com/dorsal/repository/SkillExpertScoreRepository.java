package com.dorsal.repository;

import com.dorsal.domain.SkillExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SkillExpertScore entity.
 */
@SuppressWarnings("unused")
public interface SkillExpertScoreRepository extends JpaRepository<SkillExpertScore,Long> {
    // Get the list of skill for the currently logged in expert
    @Query("select ses from SkillExpertScore ses where ses.expertaccount.user.login = ?#{principal.username} ORDER BY ses.id ASC")
    List<SkillExpertScore> findByUserIsCurrentUser();

}
