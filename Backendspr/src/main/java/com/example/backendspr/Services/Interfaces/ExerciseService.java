package com.example.backendspr.Services.Interfaces;

import com.example.backendspr.models.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseService {
    List<Exercise> getAllExercises();

    Optional<Exercise> getExerciseById(Long id);

    Exercise saveOrUpdateExercise(Exercise exercise);

    void deleteExercise(Long id);
}
