package com.dorsal.repository;

import com.dorsal.domain.Updatetype;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Updatetype entity.
 */
@SuppressWarnings("unused")
public interface UpdatetypeRepository extends JpaRepository<Updatetype,Long> {

}
