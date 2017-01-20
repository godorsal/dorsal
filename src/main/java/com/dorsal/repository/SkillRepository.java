package com.dorsal.repository;

import com.dorsal.domain.Skill;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Skill entity.
 */
@SuppressWarnings("unused")
public interface SkillRepository extends JpaRepository<Skill,Long> {

}
