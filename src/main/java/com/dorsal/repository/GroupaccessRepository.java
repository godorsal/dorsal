package com.dorsal.repository;

import com.dorsal.domain.Groupaccess;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Groupaccess entity.
 */
@SuppressWarnings("unused")
public interface GroupaccessRepository extends JpaRepository<Groupaccess,Long> {

    @Query("select groupaccess from Groupaccess groupaccess where groupaccess.authorizeduser.login = ?#{principal.username}")
    List<Groupaccess> findByAuthorizeduserIsCurrentUser();

    @Query("select groupaccess from Groupaccess groupaccess where groupaccess.user.login = ?#{principal.username}")
    List<Groupaccess> findByUserIsCurrentUser();

}
