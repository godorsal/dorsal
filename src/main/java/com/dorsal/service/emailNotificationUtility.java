package com.dorsal.service;

import com.dorsal.domain.Supportcase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

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

    public boolean createSupportCaseNotifications(Supportcase supportcase) {

        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {"","","","",""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());
            Context context = new Context(userlocale);

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();
            args[1] = supportcase.getUser().getFirstName();
            args[2] = supportcase.getUser().getLastName();
            args[3] = supportcase.getExpertaccount().getUser().getFirstName();
            args[4] = supportcase.getExpertaccount().getUser().getLastName();

            emailSubject = messageSource.getMessage("notification.supportcase.create.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.supportcase.create.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());
            context = new Context(expertlocale);

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

    public boolean createSupportCaseEstimate(Supportcase supportcase) {
        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());
            Context context = new Context(userlocale);

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();


            emailSubject = messageSource.getMessage("notification.estimate.create.subject", args, userlocale);
            emailContent = messageSource.getMessage("notification.estimate.create.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());
            context = new Context(expertlocale);

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

    public boolean updateSupportCaseEstimate(Supportcase supportcase) {

        // Local variables
        String emailSubject;
        String emailContent;
        String[] args = {""};

        try {
            // User & Context
            Locale userlocale = Locale.forLanguageTag(supportcase.getUser().getLangKey());
            Context context = new Context(userlocale);

            args[0] = supportcase.getTechnology().getName() + '-' + supportcase.getId().toString();


            emailSubject = messageSource.getMessage("notifications.estimate.update.subject", args, userlocale);
            emailContent = messageSource.getMessage("notifications.estimate.update.content", args, userlocale);
            mailService.sendEmail(supportcase.getUser().getEmail(), emailSubject, emailContent, false, true);

            // Expert & Context
            Locale expertlocale = Locale.forLanguageTag(supportcase.getExpertaccount().getUser().getLangKey());
            context = new Context(expertlocale);

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


}
