package com.example.backendspr.app.service;

import com.example.backendspr.app.models.Relaxation;
import com.example.backendspr.app.models.Tip;

import java.util.List;

public interface RelaxationService {
    Relaxation saveOrUpdate(Relaxation relaxation);
    void delete(Long id);
    Relaxation getById(Long id);
    List<Relaxation> getAll();
    List<Tip> getAllTips(Long relaxationId);
}