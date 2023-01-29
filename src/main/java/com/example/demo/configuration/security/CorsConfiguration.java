package com.example.demo.configuration.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    String[] allowDomains = {
        "http://localhost:4200",
        "http://localhost:8080"
    };
    String[] allowedHeaders = {
        "Origin", "Accept", "authorization", "X-Requested-With"
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedHeaders("*");
            /* .allowCredentials(true)
            .allowedOrigins(allowDomains); */
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{path:[^\\.]*}")
                .setViewName("forward:/");

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //Should be the default version
        registry
                .addResourceHandler("/resources/**")
                .addResourceLocations("/resources/", "/other-resources/")
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }

}
