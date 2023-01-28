package com.example.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

        String[] staticResources = {
                        "/index.html",
                        "/*.js", "/*.css", "/*.ico"
        };
        String[] clientSideResources = {
                        "/", "/home", "/login"
        };

        /*
         * TODO: check if best practice to handle resources here
         * Or in security config
         */
        @Bean
        WebSecurityCustomizer webSecurity() throws Exception {
                return (web) -> web.ignoring().requestMatchers(staticResources);
        }

        /* For testing purposes only */
        @Bean
        UserDetailsService users() {
                UserBuilder users = User.withDefaultPasswordEncoder();
                UserDetails user = users
                                .username("user")
                                .password("pass")
                                .roles("USER")
                                .build();
                UserDetails superUser = users
                                .username("super")
                                .password("superpass")
                                .roles("USER", "SUPERUSER")
                                .build();
                UserDetails admin = users
                                .username("admin")
                                .password("adminpass")
                                .roles("ADMIN", "USER", "SUPERUSER")
                                .build();

                return new InMemoryUserDetailsManager(user, admin, superUser);
        }

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                // https://angular.io/api/common/http/HttpClientXsrfModule
                // https://docs.spring.io/spring-security/reference/5.8/migration/servlet/exploits.html
                CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
                requestHandler.setCsrfRequestAttributeName(null);
                // requestHandler.setCsrfRequestAttributeName("_csrf");//possible break here
                http

                                /*
                                 * .and()
                                 * .cors(cors -> cors.disable())
                                 */
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
                                .httpBasic()
                                .and()
                                .csrf((csrf) -> csrf
                                                // for angular
                                                .csrfTokenRequestHandler(requestHandler)
                                                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));
                return http.build();
        }

}
