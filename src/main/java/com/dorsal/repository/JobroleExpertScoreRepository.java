package com.dorsal.repository;

import com.dorsal.domain.JobroleExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the JobroleExpertScore entity.
 */
@SuppressWarnings("unused")
public interface JobroleExpertScoreRepository extends JpaRepository<JobroleExpertScore,Long> {

}
