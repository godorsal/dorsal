package com.dorsal.repository;

import com.dorsal.domain.ExpertPool;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertPool entity.
 */
@SuppressWarnings("unused")
public interface ExpertPoolRepository extends JpaRepository<ExpertPool,Long> {

}
