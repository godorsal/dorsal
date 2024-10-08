package com.dorsal.repository;

import com.dorsal.domain.ExpertPool;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertPool entity.
 */
@SuppressWarnings("unused")
public interface ExpertPoolRepository extends JpaRepository<ExpertPool,Long> {
    @Query("select expertpool from ExpertPool expertpool where expertpool.expertpoolowner.user.login = ?#{principal.username} ORDER BY expertpool.name DESC")
    List<ExpertPool> findByUserIsCurrentUser();

    @Query(value = "select expertpool from ExpertPool expertpool where ?#{principal.username} = 'admin'  ORDER BY expertpool.name DESC")
     List<ExpertPool>  findAllAdminIsCurrentUser();

    @Query("select expertpool from ExpertPool expertpool where lower(expertpool.name) like :expertpoolname")
    ExpertPool findExpertPoolByName(@Param("expertpoolname")String expertpoolname);
}
