package com.example.backendspr.models;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private Date birthdate;
    private String address;
}