package com.example.backendspr.Controller;

import com.example.backendspr.Models.Eexercice;
import com.example.backendspr.Models.Exercise;
import com.example.backendspr.Services.Interfaces.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<Exercise> createExercise(
            @RequestParam("nom") String nom,
            @RequestParam("type") Eexercice type,
            @RequestParam("description") String description,
            @PathVariable Long programId,
            @RequestPart("file") MultipartFile file) throws IOException {

        Exercise exercise = Exercise.builder()
                .nom(nom)
                .type(type)
                .description(description)
                .build();

        byte[] imageBytes = file.getBytes();
        exercise.setImage(imageBytes);

        Exercise createdExercise = exerciseService.addExercise(exercise, programId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExercise);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id,
                                                   @RequestParam String nom,
                                                   @RequestParam Eexercice type,
                                                   @RequestParam String description,
                                                   @RequestPart(required = false) MultipartFile file) throws IOException {
        Optional<Exercise> optionalExercise = exerciseService.getExerciseById(id);
        if (!optionalExercise.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Exercise exercise = optionalExercise.get();
        exercise.setNom(nom);
        exercise.setType(type);
        exercise.setDescription(description);

        if (file != null) {
            byte[] imageBytes = file.getBytes();
            exercise.setImage(imageBytes);
        }

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
