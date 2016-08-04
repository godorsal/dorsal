package com.dorsal.repository;

import com.dorsal.domain.Rating;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Rating entity.
 */
@SuppressWarnings("unused")
public interface RatingRepository extends JpaRepository<Rating,Long> {

    @Query("select r from Rating r where r.supportcase.id   = :supportcaseid")
    Rating findRatingBySupportcaseID(@Param("supportcaseid") long suportcaseid);

}
