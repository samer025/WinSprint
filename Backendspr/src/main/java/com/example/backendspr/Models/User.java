package com.example.backendspr.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String username;

    private String email;


    private String password;

    private String firstname;

    private String lastname;


    private Date birthdate;

    private String address;

    private String phone;



    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<com.example.backendspr.Models.Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<com.example.backendspr.Models.Program> programs = new HashSet<>();



    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
