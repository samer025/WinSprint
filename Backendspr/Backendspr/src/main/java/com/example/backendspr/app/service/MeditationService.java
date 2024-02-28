package com.example.backendspr.app.service;

import com.example.backendspr.app.models.Meditation;
import com.example.backendspr.app.models.Tip;

import java.util.List;

public interface MeditationService {
    Meditation saveOrUpdate(Meditation meditation);
    void delete(Long id);
    Meditation getById(Long id);
    List<Meditation> getAll();
    List<Tip> getAllTips(Long meditationId);
}