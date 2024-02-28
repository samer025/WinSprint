package com.example.backendspr.app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "RELAXATION")
public class Relaxation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String title;

    @OneToMany(mappedBy = "relaxation", cascade = CascadeType.MERGE, orphanRemoval = true)
    private List<Tip> tips = new ArrayList<>();

    public Relaxation(String description, String title) {
        this.description = description;
        this.title = title;
    }


}