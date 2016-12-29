package com.dorsal.repository;

import com.dorsal.domain.Speciality;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Speciality entity.
 */
@SuppressWarnings("unused")
public interface SpecialityRepository extends JpaRepository<Speciality,Long> {

}
