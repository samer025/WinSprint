package com.example.backendspr.models;

import lombok.*;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "Exercise")
public class Exercise implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    @Enumerated(EnumType.STRING)
    private Eexercice type;
    private String description;
    private String image;

    @ManyToMany(mappedBy = "exercises")
    private Set<Program> programs;



}
