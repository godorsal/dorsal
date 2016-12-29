package com.dorsal.repository;

import com.dorsal.domain.JobRole;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the JobRole entity.
 */
@SuppressWarnings("unused")
public interface JobRoleRepository extends JpaRepository<JobRole,Long> {

}
