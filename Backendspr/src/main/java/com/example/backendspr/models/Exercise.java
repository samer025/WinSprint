package com.example.backendspr.Models;

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


}
