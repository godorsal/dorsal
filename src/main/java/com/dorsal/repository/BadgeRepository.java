package com.dorsal.repository;

import com.dorsal.domain.Badge;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Badge entity.
 */
@SuppressWarnings("unused")
public interface BadgeRepository extends JpaRepository<Badge,Long> {

}
