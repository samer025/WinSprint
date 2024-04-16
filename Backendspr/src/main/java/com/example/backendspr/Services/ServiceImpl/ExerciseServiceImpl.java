package com.example.backendspr.Services.ServiceImpl;

import com.example.backendspr.Models.Exercise;
import com.example.backendspr.Models.Program;
import com.example.backendspr.Repositories.ExerciceRepository;
import com.example.backendspr.Repositories.ProgramRepository;
import com.example.backendspr.Services.Interfaces.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    private ExerciceRepository exerciseRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Optional<Exercise> getExerciseById(Long id) {
        return exerciseRepository.findById(id);
    }

    @Override
    public Exercise addExercise(Exercise exercise, Long programId) {
        // Fetch the program by id
        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new IllegalArgumentException("Program with id " + programId + " does not exist!"));

        // Set the program for the exercise
        exercise.setProgram(program);

        // Save the exercise
        return exerciseRepository.save(exercise);
    }

    @Override
    public Exercise updateExercise(Exercise exercise) {
        // Check if the exercise already exists
        Exercise existingExercise = exerciseRepository.findById(exercise.getId())
                .orElseThrow(() -> new IllegalArgumentException("Exercise with id " + exercise.getId() + " does not exist!"));

        // Update the exercise properties
        existingExercise.setNom(exercise.getNom());
        existingExercise.setType(exercise.getType());
        existingExercise.setDescription(exercise.getDescription());
        existingExercise.setImage(exercise.getImage());

        // Save the updated exercise
        return exerciseRepository.save(existingExercise);
    }


    @Override
    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
