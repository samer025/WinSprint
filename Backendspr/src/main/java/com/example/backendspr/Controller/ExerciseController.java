package com.example.backendspr.Controller;

import com.example.backendspr.Models.Exercise;
import com.example.backendspr.Services.Interfaces.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{programId}")
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise, @PathVariable Long programId) {
        Exercise createdExercise = exerciseService.addExercise(exercise, programId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise exercise) {
        if (!exerciseService.getExerciseById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        exercise.setId(id);
        Exercise updatedExercise = exerciseService.updateExercise(exercise);
        return ResponseEntity.ok(updatedExercise);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        if (!exerciseService.getExerciseById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
}
