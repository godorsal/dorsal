package com.dorsal.service;

import com.dorsal.config.DorsalProperties;
import com.dorsal.domain.Casetechnologyproperty;
import com.dorsal.domain.ExpertAccount;
import com.dorsal.domain.Supportcase;
import com.dorsal.domain.enumeration.Availability;
import com.dorsal.repository.CasetechnologypropertyRepository;
import com.dorsal.repository.ExpertAccountRepository;
import com.dorsal.repository.UserRepository;
import com.dorsal.web.rest.util.QueryStringParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
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

    @Inject
    private UserRepository userRepository;

    @Inject
    private CasetechnologypropertyRepository casetechnologypropertyRepository;

    private static String NO_EXPERT_FOR_ATTRIBUTES = "No expert found for the required attributes: ";
    private static String NO_EXPERT_FOR_ATTRIBUTES_PRODUCTS = "No expert found for the required attributes and products: ";
    private static String NO_EXPERT_FOR_PRODUCT = "No expert is available for products: ";

    // Property values
    private static String PROPERTY_CONFIGURATION = "Configuration";
    private static String PROPERTY_OTHER = "Other";
    private static String PROPERTY_ENVIRONMENT = "Environment";
    private static String PROPERTY_OS = "OS";

    private static int DEFAULT_SCORE = 3;


    /**
     * Dorsal application v1.2
     * This method is new for version 1.2 of the Dorsal application. The extended match algorithm takes into account the
     * rich expert profiles and attributes to find the right expert.
     *
     * Matching algorithm:
     * --> Lookup expert that matches master user attributes and case attributes. If no match return Concierge user
     * --> Lookup expert for product and attributes. If no match return concierge user
     * --> Select best available expert
     *
     * @param supportcase Incoming support case object that needs to have an expert assigned.
     * @return  Expert account that does match the criteria from the incoming case. If no match is found the default Dorsal Concierge is returned.
      */
    public ExpertAccount findExpertByProfileMatch(Supportcase supportcase) {
        /*
            Initialization
        */
        List<ExpertAccount> experts = null;
        List <Casetechnologyproperty> casetechpropertiesList = null;

        List<String> attributeListArray = new ArrayList<String>();
        List<String> productListArray = new ArrayList<String>();
        List<Long> expertIDListArray = new ArrayList<Long>();

        // Intake Other property value placeholders
        String otherPropertyValue = "";
        String inputAttribute = "";
        String inputProduct = "";
        String inputSkill = "";
        String inputGroup = "";

        // Set default expert to the Dorsal Concierge
        ExpertAccount expert = expertAccountRepository.getDorsalConcierge(dorsalProperties.getSupport().getConcierge());

        /*
            Extract attributes values from:
            --> Master User, current user
            --> TAG in Other property attached to support case
         */
        String attributeList = userRepository.getAttributesForMasterUser(supportcase.getUser().getId());
        if (attributeList != null && attributeList.length() > 0) {
            log.warn("Attributes [" + attributeList + "] for user " + supportcase.getUser().getLogin());
        } else {
            log.warn("Master user has no attributes");
            attributeList = "";
        }

        String userAttribute = userRepository.getAttributesForUser();
        if(userAttribute != null & userAttribute.length() > 0) {
            if (attributeList.length() > 0)
                attributeList = attributeList + "," + userAttribute;
            else
                attributeList = userAttribute;
        }
        log.warn("Master and User attributes: "+ attributeList);

        // Get attributes from support case that are defined in the Other property. User can define Attribute, Product, Group and Skill

        casetechpropertiesList = casetechnologypropertyRepository.findPropertiesByCaseAndName(supportcase.getId(), PROPERTY_OTHER);
        log.warn("Property other lookup for ID: " + supportcase.getId());
        if (casetechpropertiesList != null && casetechpropertiesList.size() > 0) {
            otherPropertyValue = casetechpropertiesList.get(0).getPropertyvalue();

            if (otherPropertyValue != null && otherPropertyValue.length() > 0) {
                inputAttribute = QueryStringParser.getValueFromTag(otherPropertyValue, QueryStringParser.TAG_ATTRIBUTE);
                log.warn("Attributes defined in Other property: " + inputAttribute);
                inputProduct   = QueryStringParser.getValueFromTag(otherPropertyValue, QueryStringParser.TAG_PRODUCT);
                inputSkill     = QueryStringParser.getValueFromTag(otherPropertyValue, QueryStringParser.TAG_SKILL);
                inputGroup     = QueryStringParser.getValueFromTag(otherPropertyValue, QueryStringParser.TAG_GROUP);

                // Add attribute if it was defined as part of other properties
                if (inputAttribute.length() > 0) {
                    if (attributeList != null && attributeList.length() > 0)
                        attributeList = attributeList + "," + inputAttribute;
                    else
                        attributeList = inputAttribute;
                }
            }
        }

        /*
            Lookup for the main product (Intake technology section)
         */

        // Extract product List -- It's technology, configuration and other
        String mainProduct = supportcase.getTechnology().getName();
        log.warn("Product property for technology: " + mainProduct);

        // Lookup expert for matching attributes if any defined
        if (attributeList != null && attributeList.length() > 0) {
            log.warn("Attribute list not empty " +attributeList);
            attributeListArray = Arrays.asList(attributeList);
            log.warn("Find Expert by attribute and product: " + mainProduct);
            experts = expertAccountRepository.findExpertByProductAndAttribute(mainProduct, DEFAULT_SCORE, attributeListArray);

            // Check for no match
            if (experts == null || experts.size() == 0) {
                log.warn("No expert match for attributes: " + attributeList);
                // Set message
                supportcase.setExpectedResult(NO_EXPERT_FOR_ATTRIBUTES + attributeList);

                // return default Concierge expert
                return expert;
            }
        }


        /**
         * At this point we might have an expert list that matches attributes and main product (MySQL, MariaDB,..)
         *
         * If we have experts match them against the properties
         *
         * If we have no properties match them against main product and product properties list
         */

        // Extract properties -- Products are under configuration
        casetechpropertiesList = casetechnologypropertyRepository.findPropertiesByCaseAndName(supportcase.getId(), PROPERTY_CONFIGURATION);
        log.warn("Get properties size[" +  casetechpropertiesList.size() + "] by case : " + supportcase.getId() + " and property: " + PROPERTY_CONFIGURATION);
        if (casetechpropertiesList != null && casetechpropertiesList.size() > 0) {
            // Extract properties
            for (int i=0; i< casetechpropertiesList.size();i++ ) {
                productListArray.add(casetechpropertiesList.get(i).getPropertyvalue());
            }
        }

        // Other property might include a Product:{values) definition
        if (inputProduct != null && inputProduct.length() > 0) {
            productListArray.add(inputProduct);
        }

        log.warn("Following products defined for expert lookup: " + productListArray.toString());

        /**
         * If experts list is empty:
         * --> if properties is empty --> lookup expert by main product only (same result  as pre 1.2)
         *
         * if (experts list is not empty (product attribute lookup sucessfull)
         * --> Create a list of expert ID's
         * --> Lookup byExpertList ID's and Product properties
         */

        if(experts == null || experts.size() == 0) {
            log.warn("No experts for product/attributes");
            if (productListArray == null || productListArray.size() == 0) {
                experts = expertAccountRepository.findExpertByMainProduct(mainProduct, DEFAULT_SCORE);
                log.warn("No product properties just get experts for main product. Number of experts: " + experts.size());

            } else {
                experts = expertAccountRepository.findExpertByProducts(productListArray, DEFAULT_SCORE);
                log.warn("Get experts for properties " + productListArray + " and for main product " + mainProduct+ " Number of experts: " + experts.size());
            }

            /* If no match return Concierge */
            if (experts == null || experts.size() == 0) {
                // Set message
                supportcase.setExpectedResult(NO_EXPERT_FOR_PRODUCT + productListArray.toString());

                // return default Concierge expert
                return expert;

            }
        } else {
            // Extract the expert ID's so that it can be passed as arguments to product properties lookup
            for (int iii=0; iii < experts.size();iii++) {
                expertIDListArray.add(experts.get(iii).getId());
            }
            log.warn("List of Experts that match attribute/product lookup: " + expertIDListArray.toString());

            experts = expertAccountRepository.findExpertThatMatchListAndProductProperties(expertIDListArray, productListArray, DEFAULT_SCORE);

            if (experts == null) {
                log.warn("NO Experts match attributes and product properties");
            } else {
                log.warn("Experts that match attributes and product properties " + experts.size());
            }

            if (experts == null || experts.size() == 0) {
                // No match -- Message and Concierge user
                log.warn("No expert match for product & attributes: " + mainProduct + " " +productListArray.toString() + " " + attributeList);
                supportcase.setExpectedResult(NO_EXPERT_FOR_ATTRIBUTES_PRODUCTS + attributeList + " Products: " + mainProduct + " " +productListArray.toString());

                // return default Concierge expert
                return expert;
            }
        }

        // Filter by Expert Group
        // TBD -- Check if Expert Group was defined

        // List of experts is available -- Pick Expert that is available
        boolean bFoundExpert = false;
        for (int ii=0; ii < experts.size();ii++ ) {
            if (experts.get(ii).isIsAvailable() == true) {
                expert = experts.get(ii);
                log.warn("Found expert : " + expert.getUser().getLogin());
                bFoundExpert = true;
            }
        }

        // If everybody is busy -- select the top expert
        if (bFoundExpert == false)
            log.warn("All experts are busy pick the top of the list: " + experts.get(0).getUser().getLogin());
            expert = experts.get(0);

        return expert;
    }


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
