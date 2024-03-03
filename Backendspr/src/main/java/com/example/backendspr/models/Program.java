package com.example.backendspr.Models;

import com.example.backendspr.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "program")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private com.example.backendspr.Models.EProgram programType;
    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY) // Assuming many programs can have one user
    @JoinColumn(name = "user_id") // Assuming this is the foreign key column in the programs table
    private User user;
}