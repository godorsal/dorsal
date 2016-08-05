package com.dorsal.repository;

import com.dorsal.domain.ExpertAccount;

import com.dorsal.domain.Technology;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import javax.persistence.QueryHint;
import java.util.List;

/**
 * Spring Data JPA repository for the ExpertAccount entity.
 */
@SuppressWarnings("unused")
public interface ExpertAccountRepository extends JpaRepository<ExpertAccount,Long> {

    List<ExpertAccount>findOneByFirsttechnology(Technology technology);
    List<ExpertAccount>findOneBySecondtechnology(Technology technology);

    @Query("select expert_account from ExpertAccount expert_account where expert_account.user.login = ?#{principal.username}")
    List<ExpertAccount> findByUserIsCurrentUser();

    /* Get Experts by technology, availability and by best score */
    @Query("select ea from ExpertAccount ea where ea.isAvailable = true AND ea.firsttechnology.id = :technologyid ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findFirstTechnologyPreference(@Param("technologyid") long technologyid, Pageable pageable);

    @Query("select ea from ExpertAccount ea where ea.isAvailable = true AND ea.secondtechnology.id = :technologyid ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findSecondTechnologyPreference(@Param("technologyid") long technologyid,Pageable pageable);

    @Query("select ea from ExpertAccount ea where ea.isAvailable = true ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertThatIsAvailable(Pageable pageable);
}
