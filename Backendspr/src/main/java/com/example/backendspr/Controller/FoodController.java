package com.example.backendspr.Controller;

import com.example.backendspr.Models.Food;
import com.example.backendspr.Services.Interfaces.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food createdFood = foodService.saveOrUpdateFood(food);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        if (!foodService.getFoodById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        food.setId(id);
        Food updatedFood = foodService.saveOrUpdateFood(food);
        return ResponseEntity.ok(updatedFood);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        if (!foodService.getFoodById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
