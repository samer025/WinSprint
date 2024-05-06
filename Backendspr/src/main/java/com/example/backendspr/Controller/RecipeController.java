package com.example.backendspr.Controller;

import com.example.backendspr.Models.Recipe;
import com.example.backendspr.Repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class RecipeController {
    @Autowired
    private RecipeRepository recipeRepository;
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
}
