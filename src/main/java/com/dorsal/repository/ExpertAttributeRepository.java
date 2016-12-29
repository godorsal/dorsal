package com.dorsal.repository;

import com.dorsal.domain.ExpertAttribute;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertAttribute entity.
 */
@SuppressWarnings("unused")
public interface ExpertAttributeRepository extends JpaRepository<ExpertAttribute,Long> {

}
