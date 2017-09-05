package com.dorsal.service;

import com.dorsal.config.DorsalProperties;
import com.dorsal.config.JHipsterProperties;
import com.dorsal.domain.User;

import org.apache.commons.lang3.CharEncoding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;


import javax.inject.Inject;
import javax.mail.internet.MimeMessage;
import java.util.Locale;

/**
 * Service for sending e-mails.
 * <p>
 * We use the @Async annotation to send e-mails asynchronously.
 * </p>
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";
    private static final String BASE_URL = "baseUrl";
    private static final String LOGIN_INFO = "loginInfo";
    private static final String EXT_LOGIN_INFO = "extLoginInfo";

    @Inject
    private JHipsterProperties jHipsterProperties;

    @Inject
    private JavaMailSenderImpl javaMailSender;

    @Inject
    private MessageSource messageSource;

    @Inject
    private SpringTemplateEngine templateEngine;

    @Inject
    private DorsalProperties dorsalProperties;

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send e-mail[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, CharEncoding.UTF_8);
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent e-mail to User '{}'", to);
        } catch (Exception e) {
            log.warn("E-mail could not be sent to user '{}', exception is: {}", to, e.getMessage());
        }
    }

    @Async
    public void sendActivationEmail(User user, String baseUrl, String actionMessage) {
        log.debug("Sending activation e-mail to '{}'", user.getEmail());
        Locale locale = Locale.forLanguageTag(user.getLangKey());

        /*
            The email subject line depends if the user is invited to join the platform
            or if a case is shared.
         */
        String  subject     = "";
        String  tempPWD     = "";
        String  loginInfo   = "";
        String  extLogInfo  = "";
        String[]    args    = {""};

        log.info("sendActivation Email() Last Name entry " + actionMessage);
        if (actionMessage != null) {
            if (actionMessage.startsWith("Invite:") ) {
                args[0] = actionMessage.substring(actionMessage.indexOf(':', 0) +1, actionMessage.lastIndexOf(':')  );
                tempPWD = actionMessage.substring(actionMessage.lastIndexOf(':') + 1);
                subject = messageSource.getMessage("email.activation.invite.title", args, locale);
                log.info("Subject message: " + subject);
            } else if (actionMessage.startsWith("Share:") ) {
                args[0] = actionMessage.substring(actionMessage.indexOf(':', 0) +1, actionMessage.lastIndexOf(':')  );
                tempPWD = actionMessage.substring(actionMessage.lastIndexOf(':') + 1);
                subject = messageSource.getMessage("email.activation.share.title", args, locale);
                log.info("Subject message: " + subject);
            }else {
                subject = messageSource.getMessage("email.activation.title", null, locale);
                log.info("Processed Subject message: " + subject);
            }
        }
        else {
            // Default activation title
            subject = messageSource.getMessage("email.activation.title", null, locale);
            log.info("Default Subject message: " + subject);
        }
        // Email text depends if a temporary password was provided or if user has created account
        if (tempPWD.length() > 0 ) {
            args[0] = tempPWD;
            loginInfo =  messageSource.getMessage("email.text.nextstep.pwd", args, locale);
            extLogInfo = messageSource.getMessage("email.text.nextstep.pwd.upd", null, locale);
        }
        else
        {
            loginInfo =  messageSource.getMessage("email.text.nextstep.nopwd", null, locale);

        }
        log.info("Email message about login [" + loginInfo + "]");

        // Generate Email
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, baseUrl);
        context.setVariable(LOGIN_INFO, loginInfo);
        context.setVariable(EXT_LOGIN_INFO, extLogInfo);
        String content = templateEngine.process("activationEmail", context);

        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendCreationEmail(User user, String baseUrl) {
        log.debug("Sending creation e-mail to '{}'", user.getEmail());
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, baseUrl);
        String content = templateEngine.process("creationEmail", context);
        String subject = messageSource.getMessage("email.activation.title", null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendPasswordResetMail(User user, String baseUrl) {
        log.debug("Sending password reset e-mail to '{}'", user.getEmail());
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, baseUrl);
        String content = templateEngine.process("passwordResetEmail", context);
        String subject = messageSource.getMessage("email.reset.title", null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }
    
    @Async
    public void sendSocialRegistrationValidationEmail(User user, String provider) {
        log.debug("Sending social registration validation e-mail to '{}'", user.getEmail());
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        //context.setVariable("provider", WordUtils.capitalize(provider));
        String content = templateEngine.process("socialRegistrationValidationEmail", context);
        String subject = messageSource.getMessage("email.social.registration.title", null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    public String getDeploymentServerURL() {
        return dorsalProperties.getApplication().getUrl();
    }

    public String getDorsalSupportEmail() { return dorsalProperties.getSupport().getMail(); }

    public String getDorsalApplicationProtocol() { return dorsalProperties.getApplication().getProtocol(); }

}
