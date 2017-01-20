package com.dorsal.repository;

import com.dorsal.domain.Supportcase;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

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

    @Query(value ="select supportcase from Supportcase supportcase where supportcase.id in (select supportcase.id from Supportcase, SharedCase sharedcase where supportcase.id = sharedcase.supportcase.id AND sharedcase.user.login = ?#{principal.username}) or supportcase.id in (select supportcase.id from Supportcase supportcase, Groupaccess groupaccess where supportcase.user.id = groupaccess.authorizeduser.id AND groupaccess.user.login = ?#{principal.username}) ORDER BY supportcase.dateCreated DESC",
           countQuery = "select count(supportcase.id) from Supportcase supportcase where supportcase.id in (select supportcase.id from Supportcase, SharedCase sharedcase where supportcase.id = sharedcase.supportcase.id AND sharedcase.user.login = ?#{principal.username}) or supportcase.id in (select supportcase.id from Supportcase supportcase, Groupaccess groupaccess where supportcase.user.id = groupaccess.authorizeduser.id AND groupaccess.user.login = ?#{principal.username} )")
    Page<Supportcase>findIsSharedwithCurrentUser(Pageable pageable);

    @Query("select count(supportcase.id) from Supportcase supportcase, SharedCase sharedcase where supportcase.id = sharedcase.supportcase.id AND sharedcase.user.login = ?#{principal.username}")
    int getCountOfSharedCasesByUser();

    @Query("select count(supportcase.id) from Supportcase supportcase, Groupaccess groupaccess WHERE supportcase.user.id = groupaccess.authorizeduser.id AND groupaccess.user.login = ?#{principal.username}")
    int getCountOfGroupAccessbyUser();

    @Query("select count(supportcase.id) from Supportcase supportcase where supportcase.expertaccount.id = :expertid AND supportcase.status.name IN ('CREATED', 'ESTIMATED', 'WORKING')")
    int getCountOfActiveCasesByExpert(@Param("expertid") long expertid);
}
