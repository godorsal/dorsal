package com.dorsal.repository;

import com.dorsal.domain.Supportcase;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Supportcase entity.
 */
@SuppressWarnings("unused")
public interface SupportcaseRepository extends JpaRepository<Supportcase,Long> {

    @Query("select supportcase from Supportcase supportcase where supportcase.user.login = ?#{principal.username}")
    List<Supportcase> findByUserIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase where supportcase.expertaccount.user.login = ?#{principal.username}")
    List<Supportcase> findByExpertIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase, SharedCase sharedcase where (supportcase.id = sharedcase.supportcase.id) AND (sharedcase.user.login = ?#{principal.username})")
    List<Supportcase> findBySharedIsCurrentUser();

}
