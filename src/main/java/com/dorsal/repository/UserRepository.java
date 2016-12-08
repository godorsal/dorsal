package com.dorsal.repository;

import com.dorsal.domain.User;

import java.time.ZonedDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(ZonedDateTime dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmail(String email);

    Optional<User> findOneByLogin(String login);

    Optional<User> findOneById(Long userId);

    @Query(value = "select distinct user from User user left join fetch user.authorities",
        countQuery = "select count(user) from User user")
    Page<User> findAllWithAuthorities(Pageable pageable);

    @Query(value = "select distinct user from User user left join fetch user.authorities where ?#{principal.username} = 'admin'",
        countQuery = "select count(user) from User user")
    Page<User> findAllAdminIsCurrentUser(Pageable pageable);

/**
    @Query("select user from User user where ?#{principal.username} = 'admin'")
    Page<User> findAllAdminIsCurrentUser(Pageable pageable);
*/
    @Query("select user from User user where user.login = ?#{principal.username}")
    User findLoggedInUser();

    @Override
    void delete(User t);

    /* Cleanup of GroupAccess and SharedCase for the user */
    @Modifying
    @Query("delete from Groupaccess ga where ga.authorizeduser.id = :userid OR ga.user.id = :userid")
    int cleanupGroupAccess(@Param("userid") long userID);

    /* Cleanup SharedCases for the user */
    @Modifying
    @Query("delete from SharedCase sc where owner.id = :userid OR user.id = :userid")
    int cleanupSharedCase(@Param("userid") long userID);
}
