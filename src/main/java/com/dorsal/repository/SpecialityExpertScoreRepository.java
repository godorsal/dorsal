package com.dorsal.repository;

import com.dorsal.domain.SpecialityExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SpecialityExpertScore entity.
 */
@SuppressWarnings("unused")
public interface SpecialityExpertScoreRepository extends JpaRepository<SpecialityExpertScore,Long> {

}
