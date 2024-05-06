package com.example.backendspr.Models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "Food")
public class Food implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private FoodType type;

    @Lob
    @Column(length = 1000000)
    private byte[] image;


}

