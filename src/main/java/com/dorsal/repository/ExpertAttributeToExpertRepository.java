package com.dorsal.repository;

import com.dorsal.domain.ExpertAttributeToExpert;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertAttributeToExpert entity.
 */
@SuppressWarnings("unused")
public interface ExpertAttributeToExpertRepository extends JpaRepository<ExpertAttributeToExpert,Long> {

}
