package com.example.demo.configuration.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.persistance.UserDao;
import com.example.demo.repositories.UserDaoRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDaoRepository userDaoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDao userDao = Optional.ofNullable(this.userDaoRepository
                .findByUsername(username))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        
        return new User(
            userDao.getUsername(),
            userDao.getPassword(),
            userDao.isEnabled(),
            userDao.isAccountNonExpired(),
            userDao.isCredentialsNonExpired(),
            userDao.isAccountNonLocked(),
            userDao.getAuthorities());
            
    }

}
