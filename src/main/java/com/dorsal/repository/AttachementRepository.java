package com.dorsal.repository;

import com.dorsal.domain.Attachement;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Attachement entity.
 */
@SuppressWarnings("unused")
public interface AttachementRepository extends JpaRepository<Attachement,Long> {

}
