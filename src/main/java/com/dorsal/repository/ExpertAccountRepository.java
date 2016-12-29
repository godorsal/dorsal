package com.dorsal.repository;

import com.dorsal.domain.ExpertAccount;

import com.dorsal.domain.Technology;
import com.dorsal.domain.enumeration.Availability;
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
    @Query("select ea from ExpertAccount ea where ea.expertAvailability != 'OFFLINE' AND ea.isAvailable = true AND ea.firsttechnology.id = :technologyid ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findFirstTechnologyPreference(@Param("technologyid") long technologyid, Pageable pageable);

    @Query("select ea from ExpertAccount ea where ea.expertAvailability != 'OFFLINE' AND ea.isAvailable = true AND ea.secondtechnology.id = :technologyid ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findSecondTechnologyPreference(@Param("technologyid") long technologyid,Pageable pageable);

    @Query("select ea from ExpertAccount ea where ea.expertAvailability != 'OFFLINE' AND ea.isAvailable = true ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertThatIsAvailable(Pageable pageable);

    @Query("select ea from ExpertAccount ea where ea.expertAvailability != 'OFFLINE' AND (ea.expertAvailability = :FULLTIME OR ea.expertAvailability = :MONFRI) AND (ea.firsttechnology.id = :technologyid OR ea.secondtechnology.id = :technologyid)  ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertsThatWorkFullTime(@Param("technologyid") long tecnologyid, @Param("FULLTIME") Availability fulltime, @Param("MONFRI") Availability monfri, Pageable pageable);

    @Query("select ea from ExpertAccount ea where ea.user.login = :concierge")
    ExpertAccount getDorsalConcierge(@Param("concierge") String conciergeLogin);

    @Query("select ea from ExpertAccount ea where ea.user.login = :userlogin")
    ExpertAccount findExpertAccountForUser(@Param("userlogin") String userLogin);
}
