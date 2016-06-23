package com.dorsal.repository;

import com.dorsal.domain.Useraccount;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Useraccount entity.
 */
@SuppressWarnings("unused")
public interface UseraccountRepository extends JpaRepository<Useraccount,Long> {

}
