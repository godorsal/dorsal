package com.dorsal.repository;

import com.dorsal.domain.SupportCaseReport;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SupportCaseReport entity.
 */
@SuppressWarnings("unused")
public interface SupportCaseReportRepository extends JpaRepository<SupportCaseReport,Long> {

}
