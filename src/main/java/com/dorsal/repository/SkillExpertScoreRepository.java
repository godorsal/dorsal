package com.dorsal.repository;

import com.dorsal.domain.SkillExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SkillExpertScore entity.
 */
@SuppressWarnings("unused")
public interface SkillExpertScoreRepository extends JpaRepository<SkillExpertScore,Long> {

}
