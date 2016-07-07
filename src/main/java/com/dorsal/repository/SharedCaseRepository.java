package com.dorsal.repository;

import com.dorsal.domain.SharedCase;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SharedCase entity.
 */
@SuppressWarnings("unused")
public interface SharedCaseRepository extends JpaRepository<SharedCase,Long> {

    @Query("select sharedCase from SharedCase sharedCase where sharedCase.user.login = ?#{principal.username}")
    List<SharedCase> findByUserIsCurrentUser();

    @Query("select sharedCase from SharedCase sharedCase where sharedCase.owner.login = ?#{principal.username}")
    List<SharedCase> findByOwnerIsCurrentUser();

}
