package com.example.demo.domain;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private String username;
    private boolean authenticated;
    private Collection<? extends GrantedAuthority> roles;
}
