package com.dorsal.repository;

import com.dorsal.domain.Expertbadge;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Expertbadge entity.
 */
@SuppressWarnings("unused")
public interface ExpertbadgeRepository extends JpaRepository<Expertbadge,Long> {

}
