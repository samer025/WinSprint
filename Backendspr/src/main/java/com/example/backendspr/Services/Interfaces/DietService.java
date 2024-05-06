package com.example.backendspr.Services.Interfaces;

import com.example.backendspr.Models.Diet;

import java.util.List;
import java.util.Optional;

public interface DietService {
    List<Diet> getAllDiets();

    Optional<Diet> getDietById(Long id);

    Diet updateDiet(Long id, Diet diet);

    Diet addDiet(Diet diet);

    void deleteDiet(Long id);
}
