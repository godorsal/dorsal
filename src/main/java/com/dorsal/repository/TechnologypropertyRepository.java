package com.dorsal.repository;

import com.dorsal.domain.Technologyproperty;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Technologyproperty entity.
 */
@SuppressWarnings("unused")
public interface TechnologypropertyRepository extends JpaRepository<Technologyproperty,Long> {

}
