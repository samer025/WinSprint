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
    public Food saveOrUpdateFood(Food food) {
        return foodRepository.save(food);
    }

    @Override
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}