package com.example.backendspr.app.service.impl;

import com.example.backendspr.app.service.RelaxationService;
import com.example.backendspr.app.models.Relaxation;
import com.example.backendspr.app.models.Tip;
import com.example.backendspr.app.repository.RelaxationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelaxationServiceImpl implements RelaxationService {

    @Autowired
    private RelaxationRepository relaxationRepository;

    @Override
    public Relaxation saveOrUpdate(Relaxation relaxation) {
        return relaxationRepository.save(relaxation);
    }

    @Override
    public void delete(Long id) {
        relaxationRepository.deleteById(id);
    }

    @Override
    public Relaxation getById(Long id) {
        return relaxationRepository.findById(id).orElse(null);
    }

    @Override
    public List<Relaxation> getAll() {
        return relaxationRepository.findAll();
    }
    @Override
    public List<Tip> getAllTips(Long relaxationId) {
        Relaxation relaxation = getById(relaxationId);
        if (relaxation != null) {
            return relaxation.getTips();
        }
        return null;
    }
}