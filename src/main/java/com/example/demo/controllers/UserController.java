package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {

    /* Display data based on user role */
    @GetMapping(value = "role-user")
    public Map<String, String> getUserPath() {
        Map<String, String> userData = new HashMap<>();

        // should be handled in service layer properly....
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        authorities.forEach(role -> {
            if (role.toString().equals("ROLE_USER")) {
                userData.put("user", "Should display to user, super and admin");
            }
            if (role.toString().equals("ROLE_SUPERUSER")) {
                userData.put("superuser", "Should display to super and admin");
            }
            if (role.toString().equals("ROLE_ADMIN")) {
                userData.put("admin", "Should display to  admin");
            }
        });

        return userData;
    }

}
