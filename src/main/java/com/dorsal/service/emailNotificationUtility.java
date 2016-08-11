package com.dorsal.service;

import com.dorsal.domain.Supportcase;
import com.dorsal.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Locale;

/**
 * Created by rogerrut on 7/25/16.
 */
@Service
public class emailNotificationUtility {
    private static final Logger log = LoggerFactory.getLogger(emailNotificationUtility.class);

    @Inject
    private MailService mailService;

    @Inject
    private MessageSource messageSource;


    /*
        Public methods
     */

    /**
     * Support Case approval depend on previous state. Determine if notifications need to be send out based on the following criteria:
     1) current case status = ESTIMATED && updated case status WORKING && updated case isApproved is true
     2) current case status WORKING && current case isApproved is false && updated case status WORKING and updated case isApproved is true

     * @param currentCase SupportCase currently persisted
     * @param updatedCase Supportcase update
     * @return true if Notification has been send out, false if no notification went out
     */
    public boolean supportCaseReEstimateApproved(Supportcase currentCase, Supportcase updatedCase) {
        boolean isNotified = false;

        if (currentCase == null || updatedCase == null)
            return isNotified;


        if (   currentCase.getStatus().getName().equalsIgnoreCase("ESTIMATED")
            && updatedCase.getStatus().getName().equalsIgnoreCase("WORKING")
            && updatedCase.isIsApproved() ) {
            log.info("Initial approval for case. Notify user and expert");
            isNotified = this.supportCaseEstimateApproved(updatedCase);
        } else if (    currentCase.getStatus().getName().equalsIgnoreCase("WORKING")
                    && !currentCase.isIsApproved()
                    && updatedCase.getStatus().getName().equalsIgnoreCase("WORKING")
                    && updatedCase.isIsApproved()){
            log.info(" Approval for re-estimate. Notify user and expert");
            isNotified = this.supportCaseEstimateApproved(updatedCase);
        }

        // No Notifications send out
        return isNotified;
    }


    /**
     * Send out email notifications for any SupportCases state changes
     * @param updatedSupportCase Supportcase that has been updated
     * @return true if notifications were send out false if no notifications went out
     */
    public boolean stateChangeNotifications(Supportcase updatedSupportCase) {

        boolean isNotified = false;
        int updates = 0;
        // Send out notification depending on the status and action
        if ((updatedSupportCase.getEstimateHours() != null)
            && (updatedSupportCase.getExpectedResult() != null)
            && (!updatedSupportCase.isIsApproved())
            && (updatedSupportCase.getStatus().getName().equalsIgnoreCase("ESTIMATED"))) {
            log.info("Expert Estimated Support case");
            updates = updatedSupportCase.getNumberOfUpdates();
            updatedSupportCase.setNumberOfUpdates(++updates);
            isNotified = createSupportCaseEstimate(updatedSupportCase);
        } else if ((updatedSupportCase.getEstimateHours() != null)
            && (updatedSupportCase.getExpectedResult() != null)
            && (!updatedSupportCase.isIsApproved() )
            && (updatedSupportCase.getStatus().getName().equalsIgnoreCase("WORKING"))) {
            log.info("Expert re-Estimated Support case");
            updates = updatedSupportCase.getNumberOfUpdates();
            updatedSupportCase.setNumberOfUpdates(++updates);
            isNotified = updateSupportCaseEstimate(updatedSupportCase);
        } else if ((updatedSupportCase.isIsResolved())
            && (updatedSupportCase.getStatus().getName().equalsIgnoreCase("COMPLETED"))) {
            log.info("Expert Completed Support case");
            isNotified = supportCaseCompleted(updatedSupportCase);
        } else if ((updatedSupportCase.isIsResolved())
            && (updatedSupportCase.isIsRated())
            && (updatedSupportCase.getStatus().getName().equalsIgnoreCase("CLOSED"))) {
            isNotified = supportCaseClosed(updatedSupportCase);
        }

        // Notification staus
        return isNotified;
    }


    /**
     * Send out email notifications for state changes
     * @param supportcase Supportcase that has been updated
     * @return true if notification  was send out, false if no notification went out
     */
    public boolean createSupportCaseNotifications(Supportcase supportcase) {

        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {"","","","",""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();
            args[1] = supportcase.getUser().getFirstName();
            args[2] = supportcase.getUser().getLastName();

            // User can have the First Name and Last name undefined so use the login as fallback
            if (   (args[1] == null || args[1].length() == 0)
                && (args[2] == null || args[2].length() == 0)) {
                args[1] = supportcase.getUser().getLogin();
            }

            args[3] = supportcase.getExpertaccount().getUser().getFirstName();
            args[4] = supportcase.getExpertaccount().getUser().getLastName();

            emailSubject = messageSource.getMessage("notification.supportcase.create.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.supportcase.create.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());

            emailSubject = messageSource.getMessage("notification.supportcase.create.subject", args, expertlocale);
            emailContent = messageSource.getMessage("notification.supportcase.create.content", args, expertlocale);
            mailService.sendEmail(supportcase.getExpertaccount().getUser().getEmail(), emailSubject, emailContent, false, true);

            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for create support case failed. Reason " + e);
            return false;
        }

    }

    public boolean escalateEmailNotifications(User requester, Supportcase supportcase, String reason, String escalateType) {

        /* Check for null objects */
        if (requester == null || supportcase == null)
            return false;

        try {
            // Local variables
            String emailSubject;
            String emailContent;
            String[] args = {"","","",""};

            String dorsalSupportEmail = mailService.getDorsalSupportEmail();

            // User
            Locale userlocale = Locale.forLanguageTag(requester.getLangKey());

            args[0] = requester.getFirstName();
            args[1] = requester.getLastName();

            // User can have the First Name and Last name undefined so use the login as fallback
            if (   (args[1] == null || args[1].length() == 0)
                && (args[2] == null || args[2].length() == 0)) {
                args[0] = requester.getLogin();
            }

            args[2] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();
            args[3] = reason;

            log.info("Escalate Email to " + dorsalSupportEmail + " For Type: " + escalateType + " and reason: " + reason);

            if (escalateType.equalsIgnoreCase("Reassign")) {

                emailSubject = messageSource.getMessage("notification.supportcase.reassign.subject", args, userlocale);
                emailContent = messageSource.getMessage("notification.supportcase.reassign.content", args, userlocale);
            } else if (escalateType.equalsIgnoreCase("Escalation")) {
                emailSubject = messageSource.getMessage("notification.supportcase.escalate.subject", args, userlocale);
                emailContent = messageSource.getMessage("notification.supportcase.escalate.content", args, userlocale);
            } else {
                emailSubject = messageSource.getMessage("notification.supportcase.default.escalate.subject", args, userlocale);
                emailContent = messageSource.getMessage("notification.supportcase.default.escalate.content", args, userlocale);
            }

            mailService.sendEmail(dorsalSupportEmail, emailSubject, emailContent, false, true);

            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for create support case failed. Reason " + e);
            return false;
        }

    }

     /*
        Private methods
     */

    private boolean createSupportCaseEstimate(Supportcase supportcase) {
        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();


            emailSubject = messageSource.getMessage("notification.estimate.create.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.estimate.create.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());

            emailSubject = messageSource.getMessage("notification.estimate.create.subject", args, expertlocale);
            emailContent = messageSource.getMessage("notification.estimate.create.content", args, expertlocale);
            mailService.sendEmail(supportcase.getExpertaccount().getUser().getEmail(), emailSubject, emailContent, false, true);

            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for create support case estimate failed. Reason " + e);
            return false;
        }
    }

    private boolean updateSupportCaseEstimate(Supportcase supportcase) {

        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();


            emailSubject = messageSource.getMessage("notifications.estimate.update.subject", args, userlocale);
            emailContent = messageSource.getMessage("notifications.estimate.update.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());

            emailSubject = messageSource.getMessage("notifications.estimate.update.subject", args, expertlocale);
            emailContent = messageSource.getMessage("notifications.estimate.update.content", args, expertlocale);
            mailService.sendEmail(supportcase.getExpertaccount().getUser().getEmail(), emailSubject, emailContent, false, true);

            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for update support case estimate failed. Reason " + e);
            return false;
        }
    }

    private boolean supportCaseCompleted(Supportcase supportcase) {
        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {"","",""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();
            args[1] = supportcase.getExpertaccount().getUser().getFirstName();
            args[2] = supportcase.getExpertaccount().getUser().getLastName();

            // User can have the First Name and Last name undefined so use the login as fallback
            if (   (args[1] == null || args[1].length() == 0)
                && (args[2] == null || args[2].length() == 0)) {
                args[1] = supportcase.getUser().getLogin();
            }


            emailSubject = messageSource.getMessage("notification.supportcase.completed.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.supportcase.completed.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);


            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for complete support case estimate failed. Reason " + e);
            return false;
        }

    }

    private boolean supportCaseClosed(Supportcase supportcase) {
        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {"","","","",""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();
            args[1] = supportcase.getUser().getFirstName();
            args[2] = supportcase.getUser().getLastName();

            // User can have the First Name and Last name undefined so use the login as fallback
            if (   (args[1] == null || args[1].length() == 0)
                && (args[2] == null || args[2].length() == 0)) {
                args[1] = supportcase.getUser().getLogin();
            }

            emailSubject = messageSource.getMessage("notification.supportcase.rated.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.supportcase.rated.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());

            emailSubject = messageSource.getMessage("notification.supportcase.rated.subject", args, expertlocale);
            emailContent = messageSource.getMessage("notification.supportcase.rated.content", args, expertlocale);
            mailService.sendEmail(supportcase.getExpertaccount().getUser().getEmail(), emailSubject, emailContent, false, true);

            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for close support case failed. Reason " + e);
            return false;
        }
    }

    private boolean supportCaseEstimateApproved(Supportcase supportcase) {

        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {"","",""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();
            args[1] = supportcase.getUser().getFirstName();
            args[2] = supportcase.getUser().getLastName();

            // User can have the First Name and Last name undefined so use the login as fallback
            if (   (args[1] == null || args[1].length() == 0)
                && (args[2] == null || args[2].length() == 0)) {
                args[1] = supportcase.getUser().getLogin();
            }

            emailSubject = messageSource.getMessage("notification.estimate.approve.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.estimate.approve.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());

            emailSubject = messageSource.getMessage("notification.estimate.approve.subject", args, expertlocale);
            emailContent = messageSource.getMessage("notification.estimate.approve.content", args, expertlocale);
            mailService.sendEmail(supportcase.getExpertaccount().getUser().getEmail(), emailSubject, emailContent, false, true);

            // Notifications sent out
            return true;

        } catch(Exception e) {
            log.warn("Email notification for support case re-approval of estimate failed. Reason " + e);
            return false;
        }
    }

}
