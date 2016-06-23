package com.dorsal.repository;

import com.dorsal.domain.Referencedoc;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Referencedoc entity.
 */
@SuppressWarnings("unused")
public interface ReferencedocRepository extends JpaRepository<Referencedoc,Long> {

    @Query("select referencedoc from Referencedoc referencedoc where referencedoc.user.login = ?#{principal.username}")
    List<Referencedoc> findByUserIsCurrentUser();

}
