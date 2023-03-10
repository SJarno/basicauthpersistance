package com.example.demo.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.configuration.security.CustomUserDetailsService;
import com.example.demo.configuration.security.SecurityConfiguration;
import com.example.demo.repositories.AuthorityRepository;
import com.example.demo.repositories.UserDaoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Map;
import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

@SuppressWarnings("unchecked")
@WebMvcTest(controllers = UserController.class)
@Import(SecurityConfiguration.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDaoRepository userDaoRepository;

    @MockBean
    private AuthorityRepository authorityRepository;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper mapper;

    @WithAnonymousUser
    @Test
    void testGetUserPathWithAnonymousUser_is302() throws Exception {
        this.mockMvc.perform(get("/role-user"))
                .andDo(print())
                .andExpect(status().is(302));
    }

    @WithMockUser(roles = "USER")
    @Test
    void testGetUserPathWithUser_is200() throws Exception {
        String result = this.mockMvc.perform(get("/role-user"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.user", is("Should display to user, super and admin")))
                .andReturn().getResponse().getContentAsString();
        
               
        Map<String, String> data = mapper.readValue(result, Map.class);
        assertEquals(1, data.size());
        assertEquals("Should display to user, super and admin", data.get("user"));
    }

    @WithMockUser(roles = { "USER", "SUPERUSER" })
    @Test
    void testGetSuperUserPathWithUser_is200() throws Exception {
        String result = this.mockMvc.perform(get("/role-user"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.user", is("Should display to user, super and admin")))
                .andExpect(jsonPath("$.superuser", is("Should display to super and admin")))
                .andReturn().getResponse().getContentAsString();
        
        Map<String, String> data = mapper.readValue(result, Map.class);
        assertEquals(2, data.size());
        assertEquals("Should display to user, super and admin", data.get("user"));
        assertEquals("Should display to super and admin", data.get("superuser"));
    }

    @WithMockUser(roles = { "USER", "SUPERUSER", "ADMIN" })
    @Test
    void testGetAdminPathWithUser_is200() throws Exception {
        String result = this.mockMvc.perform(get("/role-user"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.user", is("Should display to user, super and admin")))
                .andExpect(jsonPath("$.superuser", is("Should display to super and admin")))
                .andExpect(jsonPath("$.admin", is("Should display to  admin")))
                .andReturn().getResponse().getContentAsString();

        Map<String, String> data = mapper.readValue(result, Map.class);
        assertEquals(3, data.size());
        assertEquals("Should display to user, super and admin", data.get("user"));
        assertEquals("Should display to super and admin", data.get("superuser"));
        assertEquals("Should display to  admin", data.get("admin"));
    }
}
