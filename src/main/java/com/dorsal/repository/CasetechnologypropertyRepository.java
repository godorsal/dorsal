package com.dorsal.repository;

import com.dorsal.domain.Casetechnologyproperty;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Casetechnologyproperty entity.
 */
@SuppressWarnings("unused")
public interface CasetechnologypropertyRepository extends JpaRepository<Casetechnologyproperty,Long> {

    @Query("select ctp FROM Casetechnologyproperty ctp, Supportcase sc WHERE ctp.supportcase.id = sc.id AND sc.id = :caseid AND ctp.propertyname like :propertyname")
    List<Casetechnologyproperty> findPropertiesByCaseAndName(@Param("caseid")long caseid, @Param("propertyname") String propertyname);

}
