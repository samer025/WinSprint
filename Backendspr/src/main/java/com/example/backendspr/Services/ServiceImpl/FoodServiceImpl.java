package com.example.backendspr.Services.ServiceImpl;

import com.example.backendspr.Models.Food;
import com.example.backendspr.Repositories.FoodRepository;
import com.example.backendspr.Services.Interfaces.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    @Override
    public Optional<Food> getFoodById(Long id) {
        return foodRepository.findById(id);
    }


    @Override
    public Food updateFood(Long id, Food food) {
        // Check if the food with the given ID exists
        Optional<Food> optionalFood = foodRepository.findById(id);
        if (optionalFood.isPresent()) {
            // Update the food's details
            food.setId(id); // Set the ID of the food to be updated
            return foodRepository.save(food);
        } else {
            throw new IllegalArgumentException("Food with id " + id + " does not exist!");
        }
    }


    @Override
    public Food addFood(Food food) {
            return foodRepository.save(food);
    }


    @Override
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}