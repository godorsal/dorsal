package com.dorsal.repository;

import com.dorsal.domain.EscalateCase;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the EscalateCase entity.
 */
@SuppressWarnings("unused")
public interface EscalateCaseRepository extends JpaRepository<EscalateCase,Long> {

    @Query("select escalateCase from EscalateCase escalateCase where escalateCase.user.login = ?#{principal.username}")
    List<EscalateCase> findByUserIsCurrentUser();

}
