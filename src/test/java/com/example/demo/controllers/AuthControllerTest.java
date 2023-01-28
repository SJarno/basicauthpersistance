package com.example.demo.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

@WebMvcTest(controllers = AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @WithAnonymousUser
    @Test
    void testUserWithAnonymous_Is401() throws Exception{
        this.mockMvc.perform(get("/user"))
            .andDo(print())
            .andExpect(status().is(401));
    }
    @WithMockUser
    @Test
    void testUserWithUser_Is200() throws Exception{
        this.mockMvc.perform(get("/user"))
            .andDo(print())
            .andExpect(status().is(200));
    }
}
