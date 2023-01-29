package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.persistance.UserDao;


public interface UserDaoRepository extends JpaRepository<UserDao, Long>{
    UserDao findByUsername(String name);
}
