package com.example.demo.persistance;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "authorities")
public class Authority {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "authority_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleName name;

    //@ManyToOne(fetch = FetchType.EAGER)
    //@OneToMany(fetch = FetchType.EAGER)
    //@JoinColumn(name = "user_id", nullable = true)
    //private UserDao user;
}
