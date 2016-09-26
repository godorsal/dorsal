package com.dorsal.repository;

import com.dorsal.domain.SupportCaseReport;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.time.ZonedDateTime;

/**
 * Spring Data JPA repository for the SupportCaseReport entity.
 */
@SuppressWarnings("unused")
public interface SupportCaseReportRepository extends JpaRepository<SupportCaseReport,Long> {

    @Query("select supportcasereport from SupportCaseReport supportcasereport where supportcasereport.supportcase.dateLastUpdate >= :daysSince")
    List<SupportCaseReport> findAllFromDaysAgo(@Param("daysSince") ZonedDateTime daysSince);

}
