package com.dorsal.repository;

import com.dorsal.domain.ExpertPoolToExpert;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertPoolToExpert entity.
 */
@SuppressWarnings("unused")
public interface ExpertPoolToExpertRepository extends JpaRepository<ExpertPoolToExpert,Long> {

    @Query("select epe from ExpertPoolToExpert epe, ExpertPool ep where ep.id = epe.expertpool.id AND ep.id = :poolid")
    List<ExpertPoolToExpert> findExpertPoolToExpertbyPoolID(@Param("poolid") long poolID);
}
