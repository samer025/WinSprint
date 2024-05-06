package com.example.backendspr.Controller;

import com.example.backendspr.Models.Food;
import com.example.backendspr.Models.FoodType;
import com.example.backendspr.Services.Interfaces.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        List<Food> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        Optional<Food> food = foodService.getFoodById(id);
        return food.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Food> createFood(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("type") FoodType type,
            @RequestPart("file") MultipartFile file) throws IOException {

        Food food = new Food();
        food.setName(name);
        food.setDescription(description);
        food.setType(type);

        byte[] imageBytes = file.getBytes();
        food.setImage(imageBytes);

        Food createdFood = foodService.addFood(food);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("type") FoodType type,
            @RequestPart(required = false) MultipartFile file) throws IOException {

        Optional<Food> optionalFood = foodService.getFoodById(id);
        if (!optionalFood.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Food food = optionalFood.get();
        food.setName(name);
        food.setDescription(description);
        food.setType(type);

        if (file != null) {
            byte[] imageBytes = file.getBytes();
            food.setImage(imageBytes);
        }

        Food updatedFood = foodService.updateFood(id, food);
        return ResponseEntity.ok(updatedFood);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
