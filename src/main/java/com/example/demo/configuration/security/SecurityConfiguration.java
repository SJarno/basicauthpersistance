package com.example.demo.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    String[] staticResources = {
            "/index.html",
            "/*.js", "/*.css", "/*.ico", "/h2/**"
    };
    String[] clientSideResources = {
            "/", "/home", "/login"
    };

    @Bean
    WebSecurityCustomizer webSecurity() throws Exception {
        return (web) -> web.ignoring().requestMatchers(staticResources);
    }

    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(this.userDetailsService);
        provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        return provider;
    }

    /*
     * @Bean
     * PasswordEncoder passwordEncoder() {
     * return new BCryptPasswordEncoder();
     * }
     */
    @Profile({"develop", "test"})
    @Bean
    SecurityFilterChain developmentSecurityFilterChain(HttpSecurity http) throws Exception {
        // https://angular.io/api/common/http/HttpClientXsrfModule
        // https://docs.spring.io/spring-security/reference/5.8/migration/servlet/exploits.html
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName(null);
        //requestHandler.setCsrfRequestAttributeName("_csrf");//possible break here

        http
                // Session management
                .sessionManagement((sessions) -> sessions
                        // this is breaking the session if set to true
                        .requireExplicitAuthenticationStrategy(false))

                .securityContext((securityContext) -> securityContext
                        .requireExplicitSave(false))
                .securityMatcher("/**")// excplicit protection for path
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(clientSideResources).permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling((exceptionHandling) -> exceptionHandling
                        .authenticationEntryPoint((request, response, exception) -> response.sendRedirect("/")))
                .httpBasic()
                .and()
                .csrf((csrf) -> csrf
                        // for angular
                        .csrfTokenRequestHandler(requestHandler)
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));

        return http.build();
    }

    @Profile("database")
    @Bean
    SecurityFilterChain databaseProfileFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests()
                .requestMatchers("/h2-console/**", "/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().disable()
                .headers().frameOptions().disable();
        return http.build();
    }

}
