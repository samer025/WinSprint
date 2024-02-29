package com.example.backendspr.Services.Interfaces;

import com.example.backendspr.Models.Food;

import java.util.List;
import java.util.Optional;

public interface FoodService {
    List<Food> getAllFoods();

    Optional<Food> getFoodById(Long id);

    Food saveOrUpdateFood(Food food);

    void deleteFood(Long id);
}