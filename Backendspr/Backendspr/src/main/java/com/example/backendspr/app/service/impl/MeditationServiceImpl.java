package com.example.backendspr.app.service.impl;

import com.example.backendspr.app.models.Meditation;
import com.example.backendspr.app.models.Tip;
import com.example.backendspr.app.repository.MeditationRepository;
import com.example.backendspr.app.service.MeditationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeditationServiceImpl implements MeditationService {

    @Autowired
    private MeditationRepository meditationRepository;

    @Override
    public Meditation saveOrUpdate(Meditation meditation) {
        return meditationRepository.saveAndFlush(meditation);
    }

    @Override
    public void delete(Long id) {
        meditationRepository.deleteById(id);
    }

    @Override
    public Meditation getById(Long id) {
        return meditationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Meditation> getAll() {
        return meditationRepository.findAll();
    }

    @Override
    public List<Tip> getAllTips(Long meditationId) {
        Meditation meditation = getById(meditationId);
        if (meditation != null) {
            return meditation.getTips();
        }
        return null;
    }
}
