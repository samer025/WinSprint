package com.example.backendspr.app.repository;

import com.example.backendspr.app.models.Tip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipRepository  extends JpaRepository<Tip,Long> {
}
