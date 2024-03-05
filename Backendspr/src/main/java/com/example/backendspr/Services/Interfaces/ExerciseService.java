package com.example.backendspr.Services.Interfaces;

import com.example.backendspr.Models.Exercise;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ExerciseService {
    List<Exercise> getAllExercises();

    Optional<Exercise> getExerciseById(Long id);

    Exercise addExercise(Exercise exercise, Long programId);

    Exercise updateExercise(Exercise exercise);

    void deleteExercise(Long id);
}
