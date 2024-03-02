package com.example.backendspr.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import java.io.Serializable;

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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id") // Assuming this is the foreign key column in the exercises table
    private Program program;

}
