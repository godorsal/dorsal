package com.dorsal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;



/**
 * Properties specific to the Dorsal application.
 *
 * <p>
 *     Properties are configured in the application.yml file.
 * </p>
 */
@Service
@ConfigurationProperties(prefix = "dorsal", ignoreUnknownFields = false)
public class DorsalProperties {

    private final Support support = new Support();
    private final Application application = new Application();

    public Support getSupport() { return support; }
    public Application getApplication() { return application; }


    public static class Support {
        private String mail = "support@godorsal.com";

        public String getMail() {
            return mail;
        }

        public void setMail(String mail) {
            this.mail = mail;
        }
    }

    public static class Application {
        private String url = "localhost:8080";

        public String getUrl() { return url;}

        public void setUrl(String url) { this.url = url;}
    }
}
