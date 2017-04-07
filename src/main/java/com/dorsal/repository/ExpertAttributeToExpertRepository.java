package com.dorsal.repository;

import com.dorsal.domain.ExpertAttributeToExpert;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertAttributeToExpert entity.
 */
@SuppressWarnings("unused")
public interface ExpertAttributeToExpertRepository extends JpaRepository<ExpertAttributeToExpert,Long> {

    @Query("select expertattributetoexpert from ExpertAttributeToExpert expertattributetoexpert where expertattributetoexpert.expertaccount.user.login = ?#{principal.username} ORDER BY expertattributetoexpert.expertattribute.name DESC")
    List<ExpertAttributeToExpert> findByUserIsCurrentUser();

    @Query("select expertattributetoexpert from ExpertAttributeToExpert expertattributetoexpert where expertattributetoexpert.expertaccount.id = :expertid ORDER BY expertattributetoexpert.expertattribute.name DESC")
    List<ExpertAttributeToExpert> findByExpertId(@Param("expertid") long expertid);


}
