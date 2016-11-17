package com.dorsal.repository;

import com.dorsal.domain.Supportcase;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Spring Data JPA repository for the Supportcase entity.
 */
@SuppressWarnings("unused")
public interface SupportcaseRepository extends JpaRepository<Supportcase,Long> {

    @Query("select supportcase from Supportcase supportcase where supportcase.user.login = ?#{principal.username} ORDER BY supportcase.dateCreated DESC")
    List<Supportcase> findByUserIsCurrentUser();

    @Query(value = "select supportcase from Supportcase supportcase where supportcase.expertaccount.user.login = ?#{principal.username}  ORDER BY supportcase.dateCreated DESC",
           countQuery = "select count(supportcase.id) from Supportcase supportcase where supportcase.expertaccount.user.login = ?#{principal.username}")
    Page<Supportcase> findByExpertIsCurrentUser(Pageable pageable);

    @Query(value = "select supportcase from Supportcase supportcase where ?#{principal.username} = 'admin'  ORDER BY supportcase.dateCreated DESC",
           countQuery = "select count(supportcase) from Supportcase supportcase where ?#{principal.username} = 'admin' ")
    Page<Supportcase>  findAllAdminIsCurrentUser(Pageable pageable);
    //List<Supportcase> findAllAdminIsCurrentUser();

    @Query(value = "select supportcase from Supportcase supportcase where supportcase.user.login = ?#{principal.username} ORDER BY supportcase.dateCreated DESC",
           countQuery = "select count(supportcase.id) from Supportcase supportcase where supportcase.user.login = ?#{principal.username}")
    Page<Supportcase> findByOwnerIsCurrentUser(Pageable pageable);

    @Query("select supportcase from Supportcase supportcase, SharedCase sharedcase where (supportcase.id = sharedcase.supportcase.id) AND (sharedcase.user.login = ?#{principal.username})  ORDER BY supportcase.dateCreated DESC")
    List<Supportcase> findBySharedIsCurrentUser();

    @Query("select supportcase from Supportcase supportcase, Groupaccess groupaccess where (supportcase.user.id = groupaccess.authorizeduser.id) AND (groupaccess.user.login = ?#{principal.username})  ORDER BY supportcase.dateCreated DESC")
    List<Supportcase> findGroupAccessUser();

    @Query(value ="select supportcase from Supportcase supportcase, SharedCase sharedcase, Groupaccess groupaccess where ((supportcase.id = sharedcase.supportcase.id) AND (sharedcase.user.login = ?#{principal.username}) AND (supportcase.user.id = groupaccess.authorizeduser.id) AND (groupaccess.user.login = ?#{principal.username}))  ORDER BY supportcase.dateCreated DESC" ,
        countQuery = "select count(supportcase.id) from Supportcase supportcase, SharedCase sharedcase, Groupaccess groupaccess where ((supportcase.id = sharedcase.supportcase.id) AND (sharedcase.user.login = ?#{principal.username}) AND (supportcase.user.id = groupaccess.authorizeduser.id) AND (groupaccess.user.login = ?#{principal.username})) ")
    Page<Supportcase>findIsSharedwithCurrentUser(Pageable pageable);
}
