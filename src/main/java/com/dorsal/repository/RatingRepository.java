package com.dorsal.repository;

import com.dorsal.domain.Rating;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Rating entity.
 */
@SuppressWarnings("unused")
public interface RatingRepository extends JpaRepository<Rating,Long> {

}
