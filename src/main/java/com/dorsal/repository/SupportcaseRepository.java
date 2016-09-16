package com.dorsal.repository;

import com.dorsal.domain.Supportcase;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Supportcase entity.
 */
@SuppressWarnings("unused")
public interface SupportcaseRepository extends JpaRepository<Supportcase,Long> {

    @Query("select supportcase from Supportcase supportcase where supportcase.user.login = ?#{principal.username} ORDER BY supportcase.dateCreated ASC")
    List<Supportcase> findByUserIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase where supportcase.expertaccount.user.login = ?#{principal.username}  ORDER BY supportcase.dateCreated ASC")
    List<Supportcase> findByExpertIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase where ?#{principal.username} = 'admin'  ORDER BY supportcase.dateCreated ASC")
    List<Supportcase> findAllAdminIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase, SharedCase sharedcase where (supportcase.id = sharedcase.supportcase.id) AND (sharedcase.user.login = ?#{principal.username})  ORDER BY supportcase.dateCreated ASC")
    List<Supportcase> findBySharedIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase, Groupaccess groupaccess where (supportcase.user.id = groupaccess.authorizeduser.id) AND (groupaccess.user.login = ?#{principal.username})  ORDER BY supportcase.dateCreated ASC")
    List<Supportcase> findGroupAccessUser();

}
