package com.kahoot.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permitir que el Frontend (puerto 5173) llame a la API del Backend (puerto 8080)
        registry.addMapping("/**") // Aplica a todas las rutas (/api/create, etc)
                .allowedOriginPatterns("*") // Permite cualquier origen (útil para desarrollo)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}