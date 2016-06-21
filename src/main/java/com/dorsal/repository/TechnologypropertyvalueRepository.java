package com.dorsal.repository;

import com.dorsal.domain.Technologypropertyvalue;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Technologypropertyvalue entity.
 */
@SuppressWarnings("unused")
public interface TechnologypropertyvalueRepository extends JpaRepository<Technologypropertyvalue,Long> {

}
