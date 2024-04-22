package com.example.backendspr.Controller;

import com.example.backendspr.Models.Diet;
import com.example.backendspr.Services.Interfaces.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diets")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class DietController {

    @Autowired
    private DietService dietService;

    @GetMapping
    public ResponseEntity<List<Diet>> getAllDiets() {
        List<Diet> diets = dietService.getAllDiets();
        return ResponseEntity.ok(diets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Diet> getDietById(@PathVariable Long id) {
        Optional<Diet> diet = dietService.getDietById(id);
        return diet.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Diet> addDiet(@RequestBody Diet diet) {
        Diet createdDiet = dietService.addDiet(diet);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Diet> updateDiet(@PathVariable Long id, @RequestBody Diet diet) {
        Diet updatedDiet = dietService.updateDiet(id, diet);
        return ResponseEntity.ok(updatedDiet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiet(@PathVariable Long id) {
        dietService.deleteDiet(id);
        return ResponseEntity.noContent().build();
    }
}
