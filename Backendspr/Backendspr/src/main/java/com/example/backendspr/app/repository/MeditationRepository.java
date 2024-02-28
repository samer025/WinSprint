package com.example.backendspr.app.repository;

import com.example.backendspr.app.models.Meditation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeditationRepository extends JpaRepository<Meditation, Long> {
}
