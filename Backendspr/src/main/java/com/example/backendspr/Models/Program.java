package com.example.backendspr.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

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
    private EProgram programType;
    private String title;
    private String description;
    private Float prix;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) // Assuming many programs can have one user
    @JoinColumn(name = "user_id") // Assuming this is the foreign key column in the programs table
    private com.example.backendspr.models.User user;


    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
    private List<Exercise> exercises = new ArrayList<>();
}