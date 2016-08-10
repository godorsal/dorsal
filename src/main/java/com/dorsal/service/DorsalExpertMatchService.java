package com.dorsal.service;

import com.dorsal.config.DorsalProperties;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Supportcase;
import com.dorsal.domain.enumeration.Availability;
import com.dorsal.repository.ExpertAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Iterator;
import java.util.List;

/**
 * Encapsulate the match algorithms in a single service
 * Created by rogerrut on 8/7/16.
 */
@Service
public class DorsalExpertMatchService {

    // Logging
    private static final Logger log = LoggerFactory.getLogger(DorsalExpertMatchService.class);

    @Inject
    private ExpertAccountRepository expertAccountRepository;

    @Inject
    private DorsalProperties dorsalProperties;


    /**
     * Find an Expert for the incoming case.
     * v1 uses the following algorithm to find a match. The order is:
     * --> Match on First technology expertise with highest score and available (not already working on cases)
     * --> Match on Second technology expertise with highest score and available (not already working on cases)
     * --> Match on any expert that is available with the highest score
     * --> Match on experts that are available Full Time or Monday through Friday, match the technology (1st and 2nd preference) with the highest score
     * --> If none of the above match assign it to the dorsal concierge for future assignments
     *
     * @param supportcase Support Case that needs an expert assignment
     * @return Expert record that matches the criteria above
     */
    public ExpertAccount findExpertForSupportcase(Supportcase supportcase) {

        ExpertAccount expert = null;

        try {
            // First technology preference, is available and ordered by score
            List experts = expertAccountRepository.findFirstTechnologyPreference(supportcase.getTechnology().getId(),new PageRequest(0,5));
            log.info("First Technology choice: Number of Experts: " + experts.size());

           if (experts.size() > 0) {
                log.info("Expert Found for Technology [" + supportcase.getTechnology().getName() + "]");
                expert = (ExpertAccount)experts.get(0);
            }
            else
            {
                // Second technology preference, is available and ordered by score
                experts = expertAccountRepository.findSecondTechnologyPreference(supportcase.getTechnology().getId(),new PageRequest(0,5));
                log.info("Second Technology choice: Number of Experts: " + experts.size());
                if (experts.size() > 0) {
                    log.info("Expert Found for Technology [" + supportcase.getTechnology().getName() + "]");
                    expert = (ExpertAccount)experts.get(0);
                } else {
                    // Find any expert that is available ordered by score
                    experts = expertAccountRepository.findExpertThatIsAvailable(new PageRequest(0,5));
                    log.info("Any Expert available: Number of Experts: " + experts.size());
                    if (experts.size() > 0) {
                        log.info("Found any expert that is available and not the concierge.");
                        expert = (ExpertAccount)experts.get(0);
                    } else {
                        /*
                            All Experts are busy. Next step is to assign case to experts that work full time. They
                            most likely have more bandwidth
                         */
                        experts = expertAccountRepository.findExpertsThatWorkFullTime(supportcase.getTechnology().getId(), Availability.FULL_TIME, Availability.MON_FRI, new PageRequest(0,5));
                        if (experts.size() > 0) {
                            log.info("Any Expert available " +  Availability.FULL_TIME.name() + " and " + Availability.MON_FRI.name() +" Found Number of Experts: " + experts.size());
                            expert = (ExpertAccount)experts.get(0);
                        } else {
                            // No match found -- need to address it to a concierge
                            log.warn("No expert available to work on the case. We'll assign it to the Dorsal concierge...");
                            return expertAccountRepository.getDorsalConcierge(dorsalProperties.getSupport().getConcierge());
                        }
                    }
                }
            }

            /**
             *  Mark an expert as busy when a case is assigned to the expert.
             */

            if ( expert != null ) {
                // Mark Expert as no longer available
                expert.setIsAvailable(false);
                expertAccountRepository.save(expert);

                // Assign Expert to support case
                supportcase.setExpertaccount(expert);
                log.info("Expert [" + expert.getId() + "] assigned to support case: [" + supportcase.getSummary() + "]");
            }

            return expert;

        } catch (Exception e) {
            log.error("Error calling into expertAccountRepository. Reason: " +e );
            return null;
        }
    }
}
