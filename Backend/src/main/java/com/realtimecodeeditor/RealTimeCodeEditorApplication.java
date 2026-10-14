package com.realtimecodeeditor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class RealTimeCodeEditorApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealTimeCodeEditorApplication.class, args);
	}
}