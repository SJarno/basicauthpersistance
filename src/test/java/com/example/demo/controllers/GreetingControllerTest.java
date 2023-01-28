package com.example.demo.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

@WebMvcTest(GreetingController.class)
public class GreetingControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
