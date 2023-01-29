package com.example.demo.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.configuration.security.CustomUserDetailsService;
import com.example.demo.configuration.security.SecurityConfiguration;
import com.example.demo.repositories.AuthorityRepository;
import com.example.demo.repositories.UserDaoRepository;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

@ActiveProfiles("test")
@WebMvcTest(GreetingController.class)
@Import(SecurityConfiguration.class)
public class GreetingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDaoRepository userService;

    @MockBean
    private AuthorityRepository authorityRepository;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @BeforeEach
    public void setUp() {

    }

    @WithAnonymousUser
    @Test
    void testGreetinWithAnonymousUser_is401() throws Exception {
        this.mockMvc.perform(get("/resource"))
                .andDo(print()).andExpect(status()
                        .is(401));
    }

    @WithMockUser(username = "user", password = "pass")
    @Test
    void testGreetingWithUser_is200() throws Exception {
        this.mockMvc.perform(get("/resource"))
                .andDo(print()).andExpect(status()
                        .is(200));
    }
}
