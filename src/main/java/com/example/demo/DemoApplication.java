package com.example.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Profile;

import com.example.demo.persistance.Authority;
import com.example.demo.persistance.RoleName;
import com.example.demo.persistance.UserDao;
import com.example.demo.repositories.AuthorityRepository;
import com.example.demo.repositories.UserDaoRepository;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	private UserDaoRepository repository;

	@Autowired
	private AuthorityRepository authorityRepository;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Profile({"test", "develop"})
	@PostConstruct
	public void initData() {
		Authority userRole = new Authority();
		userRole.setName(RoleName.ROLE_USER);
		//userRole.setUser(user);

		Authority superUserRole = new Authority();
		superUserRole.setName(RoleName.ROLE_SUPERUSER);

		Authority adminRole = new Authority();
		adminRole.setName(RoleName.ROLE_ADMIN);

		authorityRepository.saveAll(List.of(userRole, superUserRole, adminRole));

		
		UserDao user = new UserDao();
		user.setUsername("user");
		user.setPassword("pass");
		List<Authority> roles = new ArrayList<>();
		roles.add(userRole);
		user.setAuthorities(roles);
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setCredentialsNonExpired(true);
		user.setEnabled(true);

		UserDao superUser = new UserDao();
		superUser.setUsername("superuser");
		superUser.setPassword("superpass");

		List<Authority> superUserRoles = new ArrayList<>();
		superUserRoles.add(userRole);
		superUserRoles.add(superUserRole);
		superUser.setAuthorities(superUserRoles);
		superUser.setAccountNonExpired(true);
		superUser.setAccountNonLocked(true);
		superUser.setCredentialsNonExpired(true);
		superUser.setEnabled(true);
		
		this.repository.saveAll(Arrays.asList(user, superUser));
		
		
		
	}

}
