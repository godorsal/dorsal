package com.dorsal.repository;

import com.dorsal.domain.ExpertPoolToExpert;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertPoolToExpert entity.
 */
@SuppressWarnings("unused")
public interface ExpertPoolToExpertRepository extends JpaRepository<ExpertPoolToExpert,Long> {

}
