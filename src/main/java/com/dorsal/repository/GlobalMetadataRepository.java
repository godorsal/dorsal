package com.dorsal.repository;

import com.dorsal.domain.GlobalMetadata;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the GlobalMetadata entity.
 */
@SuppressWarnings("unused")
public interface GlobalMetadataRepository extends JpaRepository<GlobalMetadata,Long> {

}
