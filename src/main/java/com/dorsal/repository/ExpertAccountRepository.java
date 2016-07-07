package com.dorsal.repository;

import com.dorsal.domain.ExpertAccount;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ExpertAccount entity.
 */
@SuppressWarnings("unused")
public interface ExpertAccountRepository extends JpaRepository<ExpertAccount,Long> {

    @Query("select expert_account from ExpertAccount expert_account where expert_account.user.login = ?#{principal.username}")
    List<ExpertAccount> findByUserIsCurrentUser();

}
