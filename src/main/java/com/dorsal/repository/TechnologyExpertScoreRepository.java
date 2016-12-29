package com.dorsal.repository;

import com.dorsal.domain.TechnologyExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TechnologyExpertScore entity.
 */
@SuppressWarnings("unused")
public interface TechnologyExpertScoreRepository extends JpaRepository<TechnologyExpertScore,Long> {

}
