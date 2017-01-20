package com.dorsal.repository;

import com.dorsal.domain.JobroleExpertScore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the JobroleExpertScore entity.
 */
@SuppressWarnings("unused")
public interface JobroleExpertScoreRepository extends JpaRepository<JobroleExpertScore,Long> {
    // Get the list of job roles for the currently logged in expert
    @Query("select jes from JobroleExpertScore jes where jes.expertaccount.user.login = ?#{principal.username} ORDER BY jes.id ASC")
    List<JobroleExpertScore> findByUserIsCurrentUser();

}
