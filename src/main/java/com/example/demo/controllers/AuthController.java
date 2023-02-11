package com.example.demo.controllers;

import java.security.Principal;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.UserDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AuthController {

    /* We dont want to expose everything so Dto in place */
    @GetMapping("/user")
    public UserDto user(Principal user) {

        Authentication authentication = SecurityContextHolder.getContext()
            .getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        //TODO: map granted auths to enums?
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getName());
        userDto.setAuthenticated(authentication.isAuthenticated());
        userDto.setRoles(authorities);
        
        log.debug("Loggin the user dto == {}", userDto);
        return userDto;
    }
}
