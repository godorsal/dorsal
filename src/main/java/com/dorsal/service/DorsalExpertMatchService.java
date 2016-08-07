package com.dorsal.service;

import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Supportcase;
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


    // Match expert
    public ExpertAccount findExpertForSupportcase(Supportcase supportcase) {

        //
        // Set the Expert for this account
        // This is the placeholder for the matching algorithm
        //
        try {
            // First technology preference, is available and ordered by score
            List experts = expertAccountRepository.findFirstTechnologyPreference(supportcase.getTechnology().getId(),new PageRequest(0,5));
            log.info("First Technology choice: Number of Experts: " + experts.size());
            Iterator itExperts = experts.iterator();
            ExpertAccount expert =  null;
            while (itExperts.hasNext()){
                expert = (ExpertAccount)itExperts.next();
                log.info("Expert " + expert.getUser().getFirstName() + " has score " + expert.getExpertScore());
            }

            if (experts.size() > 0) {
                log.info("Expert Found for Technology [" + supportcase.getTechnology().getName() + "]");
                return (ExpertAccount)experts.get(0);
            }
            else
            {
                // Second technology preference, is available and ordered by score
                experts = expertAccountRepository.findSecondTechnologyPreference(supportcase.getTechnology().getId(),new PageRequest(0,5));
                log.info("Second Technology choice: Number of Experts: " + experts.size());
                if (experts.size() > 0) {
                    log.info("Expert Found for Technology [" + supportcase.getTechnology().getName() + "]");
                    return (ExpertAccount)experts.get(0);
                } else {
                    // Find any expert that is available ordered by score
                    experts = expertAccountRepository.findExpertThatIsAvailable(new PageRequest(0,5));
                    log.info("Any Expert available: Number of Experts: " + experts.size());
                    if (experts.size() > 0) {
                        log.info("Found available Expert ");
                        return (ExpertAccount)experts.get(0);
                    } else {
                        // No match found -- need to address it to a concierge
                        log.warn("No expert available to work on the case. We keep searching...");
                        return null;
                    }
                }
            }

        } catch (Exception e) {
            log.error("Error calling into expertAccountRepository. Reason: " +e );
            return null;
        }
    }
}
