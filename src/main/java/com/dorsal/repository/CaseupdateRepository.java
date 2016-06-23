package com.dorsal.repository;

import com.dorsal.domain.Caseupdate;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Caseupdate entity.
 */
@SuppressWarnings("unused")
public interface CaseupdateRepository extends JpaRepository<Caseupdate,Long> {

    @Query("select caseupdate from Caseupdate caseupdate where caseupdate.user.login = ?#{principal.username}")
    List<Caseupdate> findByUserIsCurrentUser();

}
