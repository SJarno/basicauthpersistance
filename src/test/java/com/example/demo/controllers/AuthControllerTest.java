package com.example.demo.controllers;

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
@WebMvcTest(controllers = AuthController.class)
@Import(SecurityConfiguration.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDaoRepository userRepository;

    @MockBean
    private AuthorityRepository authorityRepository;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @WithAnonymousUser
    @Test
    void testUserWithAnonymous_Is302() throws Exception {
        this.mockMvc.perform(get("/user"))
                .andDo(print())
                .andExpect(status().is(302));
    }

    @WithMockUser(username = "user", password = "pass")
    @Test
    void testUserWithUser_Is200() throws Exception {
        
        this.mockMvc.perform(get("/user"))
                .andDo(print())
                .andExpect(status().is(200));

                

    }

}
