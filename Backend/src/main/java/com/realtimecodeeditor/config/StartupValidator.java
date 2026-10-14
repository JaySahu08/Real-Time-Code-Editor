package com.realtimecodeeditor.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class StartupValidator {

    private static final Logger log = LoggerFactory.getLogger(StartupValidator.class);
    private static final int MIN_SECRET_BYTES = 32;

    private final AppProperties props;

    public StartupValidator(AppProperties props) {
        this.props = props;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void validate() {
        String secret = props.jwt().secret();
        int length = secret.getBytes(StandardCharsets.UTF_8).length;
        if (length < MIN_SECRET_BYTES) {
            throw new IllegalStateException(
                    "JWT_SECRET must be at least " + MIN_SECRET_BYTES +
                            " bytes when UTF-8 encoded (current: " + length + "). " +
                            "Generate one with: openssl rand -base64 48");
        }
        log.info("Configuration validated. JWT issuer={} accessTTL={}s refreshTTL={}s",
                props.jwt().issuer(),
                props.jwt().accessTtlSeconds(),
                props.jwt().refreshTtlSeconds());
        log.info("CORS allowed origins: {}", props.cors().allowedOrigins());
    }
}