package com.example.demo.configuration.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ActiveProfiles;

import com.example.demo.persistance.Authority;
import com.example.demo.persistance.RoleName;
import com.example.demo.persistance.UserDao;
import com.example.demo.repositories.UserDaoRepository;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class CustomUserDetailsServiceTest {

    @Mock
    private UserDaoRepository userDaoRepository;

    @InjectMocks
    private CustomUserDetailsService userDetailsService;

    @BeforeEach
    void setUp() {

    }

    @Test
    void testLoadUserByUsername() {
        // expected:
        List<Authority> roles = new ArrayList<>();
        Authority authority = new Authority();
        authority.setName(RoleName.ROLE_USER);
        roles.add(authority);

        UserDao userDao = new UserDao();
        userDao.setUsername("user");
        userDao.setPassword("pass");
        userDao.setAuthorities(roles);

        // mock
        when(this.userDaoRepository.findByUsername("user")).thenReturn(userDao);

        // results
        UserDetails foundUser = this.userDetailsService.loadUserByUsername("user");
        assertEquals("user", foundUser.getUsername());
        assertNotNull(foundUser.getPassword());
        assertEquals(1, foundUser.getAuthorities().size());

        // verify that the correct method was called
        verify(this.userDaoRepository, times(1)).findByUsername("user");
    }

    @Test
    void testUsernameNotFoundThrowsException() {
        Exception ex = assertThrows(UsernameNotFoundException.class, () -> {
            this.userDetailsService.loadUserByUsername("wronguser");
        });
        assertEquals("User not found with username: wronguser", ex.getMessage());

    }
}
