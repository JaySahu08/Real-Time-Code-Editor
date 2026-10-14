package com.realtimecodeeditor.config;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final Jwt jwt;
    private final Cors cors;
    private final Limits limits;

    public AppProperties(Jwt jwt, Cors cors, Limits limits) {
        this.jwt = jwt;
        this.cors = cors;
        this.limits = limits;
    }

    public Jwt jwt() { return jwt; }
    public Cors cors() { return cors; }
    public Limits limits() { return limits; }

    public record Jwt(
            @NotBlank String secret,
            @Min(60) long accessTtlSeconds,
            @Min(300) long refreshTtlSeconds,
            @NotBlank String issuer
    ) {}

    public record Cors(
            @NotEmpty List<String> allowedOrigins
    ) {}

    public record Limits(
            @Min(1024) long maxFileContentBytes,
            @Min(1) int maxChatMessageChars
    ) {}
}