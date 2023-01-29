package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.persistance.Authority;
import com.example.demo.persistance.RoleName;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(RoleName name);
}
