package com.example.backendspr.app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor

public class Meditation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String title;

    @OneToMany(mappedBy = "meditation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tip> tips = new ArrayList<>();

    // Constructors, Getters, and Setters

    public Meditation() {}

    public Meditation(String description, String title) {
        this.description = description;
        this.title = title;
    }

}