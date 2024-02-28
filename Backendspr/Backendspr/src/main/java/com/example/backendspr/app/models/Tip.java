package com.example.backendspr.app.models;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;



@Entity
@AllArgsConstructor

@Table(name = "TIP")
public class Tip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "relaxation_id")
    private Relaxation relaxation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meditation_id")
    private Meditation meditation;


    public Tip() {}

}