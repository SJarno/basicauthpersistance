package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles({"test", "develop", "database"})
@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
