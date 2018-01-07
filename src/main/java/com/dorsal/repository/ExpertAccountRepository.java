package com.dorsal.repository;

import com.dorsal.domain.ExpertAccount;

import com.dorsal.domain.GlobalMetadata;
import com.dorsal.domain.Technology;
import com.dorsal.domain.enumeration.Availability;
import org.springframework.data.domain.Page;
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

    // Good Expert Match queries seraching across rich profiles. The expert list is always ordered by expert_score
    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score ORDER BY ea.expertScore DESC")
    // @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount_id AND pes.product_id = p.id and p.name IN (:productlist) AND pes.score >= :score ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByProducts(@Param("productlist")List<String> productlist, @Param("score") int score);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name like :mainproduct AND pes.score >= :score ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByMainProduct(@Param("mainproduct")String mainProduct, @Param("score") int score);


    @Query(value = "select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score ORDER BY ea.expertScore DESC",
    countQuery = "select distinct count(ea) from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score ")
    Page<ExpertAccount> findExpertByProductsList(@Param("productlist")List<String> productlist, @Param("score") int score, Pageable pageable);

    @Query(value = "select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, ExpertAttribute eatt, ExpertAttributeToExpert eate where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score AND eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id ORDER BY ea.expertScore DESC",
    countQuery = "select distinct count(ea) from ExpertAccount ea,  ProductExpertScore pes, Product p, ExpertAttribute eatt, ExpertAttributeToExpert eate where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score AND eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id")
    Page<ExpertAccount> findExpertByProductsAndAttributeLists(@Param("productlist")List<String> productlist, @Param("score") int score, @Param("attributelist")List<String> attributelist, Pageable pageable);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, ExpertAttribute eatt, ExpertAttributeToExpert eate where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name like :mainproduct AND pes.score >= :score AND eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByProductAndAttribute(@Param("mainproduct")String mainProduct, @Param("score") int score, @Param("attributelist")List<String> attributelist);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, ExpertAttribute eatt, ExpertAttributeToExpert eate,  Skill s, SkillExpertScore ses where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name like :mainproduct AND pes.score >= :score AND ses.score >= :score AND s.name IN(:skilllist) AND s.id = ses.skill.id AND ses.expertaccount.id = ea.id AND eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByProductAndAttributeAndSkill(@Param("mainproduct")String mainProduct, @Param("score") int score, @Param("attributelist")List<String> attributelist, @Param("skilllist")List<String> skilllist);

    // @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, Skill s, SkillExpertScore ses where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name like :mainproduct AND pes.score >= :score AND s.name IN(:skilllist) AND s.id = ses.skill.id AND ses.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    // @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, Skill s, SkillExpertScore ses where ea.id = ses.expertaccount.id AND pes.product.id = p.id and p.name like :mainproductAND s.name IN(:skilllist) AND s.id = ses.skill.id AND ses.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    // @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, Skill s, SkillExpertScore ses where e.id = es.expertaccount_id AND ps.expertaccount_id = e.id AND ps.product_id = 1 AND es.skill_id = 4 AND es.score = 5 AND ps.score = 5")
    // "select * from skill_expert_score es, product_expert_score ps, expert_account e where e.id = es.expertaccount_id AND ps.expertaccount_id = e.id AND ps.product_id = 1 AND es.skill_id = 4 AND es.score = 5 AND ps.score = 5"
    // List<ExpertAccount> findExpertByProductAndSkill(@Param("mainproduct")String mainProduct, @Param("score") int score, @Param("skilllist")List<String> skilllist);
    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, Skill s, SkillExpertScore ses where ea.id = ses.expertaccount.id AND pes.product.id = p.id and p.name like :mainproduct AND pes.score >= :score AND ses.score >= :score AND s.name IN(:skillList) AND s.id = ses.skill.id AND ses.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByProductAndSkill(@Param("mainproduct")String mainProduct, @Param("score") int score, @Param("skillList")List<String> skillList);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, ExpertPool ep, ExpertPoolToExpert epte where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score AND lower(ep.name) like :expertpool AND ep.id = epte.expertpool.id AND epte.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByProductsAndExpertPool(@Param("productlist")List<String> productlist, @Param("score") int score, @Param("expertpool")String expertpool);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p, ExpertPool ep, ExpertPoolToExpert epte, ExpertAttribute eatt, ExpertAttributeToExpert eate where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score AND lower(ep.name) like :expertpool AND ep.id = epte.expertpool.id AND epte.expertaccount.id = ea.id AND eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertByProductsAndAttributesAndExpertPool(@Param("productlist")List<String> productlist, @Param("score") int score, @Param("attributelist")List<String> attributelist, @Param("expertpool")String expertpool);

    @Query(value ="select distinct ea from ExpertAccount ea, ExpertAttribute eatt, ExpertAttributeToExpert eate where eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id ORDER BY ea.expertScore DESC",
    countQuery = "select distinct count(ea) from ExpertAccount ea, ExpertAttribute eatt, ExpertAttributeToExpert eate where eatt.name IN(:attributelist) AND eatt.id = eate.expertattribute.id AND eate.expertaccount.id = ea.id")
    Page<ExpertAccount> findExpertByAttribute(@Param("attributelist")List<String> attributelist, Pageable pageable);

    //    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount.id AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score  ORDER BY ea.expertScore DESC")
    //    List<ExpertAccount> findExpertByProduct(@Param("productlist")List<String> productlist, @Param("score") int score);

    @Query("select distinct ea from ExpertAccount ea, SkillExpertScore ses, Skill s where ea.id = ses.expertaccount.id AND ses.skill.id = s.id and s.name IN (:skilllist) AND ses.score >= :score ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertBySkill(@Param("skilllist")List<String> skilllist, @Param("score") int score);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, Product p where ea.id = pes.expertaccount.id AND ea.id IN(:expertidlist) AND pes.product.id = p.id and p.name IN (:productlist) AND pes.score >= :score ORDER BY ea.expertScore DESC")
    List<ExpertAccount>findExpertThatMatchListAndProductProperties(@Param("expertidlist")List<Long> expertidlist, @Param("productlist")List<String> productlist, @Param("score") int score);

    @Query("select distinct ea from ExpertAccount ea, ProductExpertScore pes, ExpertPool ep, ExpertPoolToExpert epte where ea.id = pes.expertaccount.id AND ea.id IN(:expertidlist) AND lower(ep.name) like :expertpool AND ep.id = epte.expertpool.id AND epte.expertaccount.id = ea.id  ORDER BY ea.expertScore DESC")
    List<ExpertAccount> findExpertMatchExpertPoolMembers(@Param("expertidlist")List<Long> expertidlist, @Param("expertpool")String expertpool);

    @Modifying
    @Query("update ExpertAccount set isAvailable = false where id = :expertid" )
    int setExpertAvailability(@Param("expertid") long expertid);

    @Query ("select gm from GlobalMetadata gm where gm.name like 'EXPERT_CASE_LIMIT'")
    GlobalMetadata getExpertCaseLimit();

}
