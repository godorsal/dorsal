package com.dorsal.repository;

import com.dorsal.domain.Technology;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Technology entity.
 */
@SuppressWarnings("unused")
public interface TechnologyRepository extends JpaRepository<Technology,Long> {

    @Query("select technology from Technology technology where technology.id >= 10 ORDER BY technology.id ASC")
    List<Technology> findExpertProfileEntries();

    @Query("select technology from Technology technology where technology.id < 10 ORDER BY technology.id ASC")
    List<Technology> findUserIntakeList();
}
