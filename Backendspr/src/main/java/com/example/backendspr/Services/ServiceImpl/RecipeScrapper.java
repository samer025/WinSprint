package com.example.backendspr.Services.ServiceImpl;

import com.example.backendspr.Models.Recipe;
import com.example.backendspr.Repositories.ArticleRepository;
import com.example.backendspr.Repositories.RecipeRepository;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeScrapper {
    @Autowired
    private RecipeRepository recipeRepository;

    private static final String Recipes_URL = "https://www.muscleandstrength.com/recipes/high-protein";

    @PostConstruct
    public void scrapeAndSaveFitnessRecipes() {
        List<Recipe> recipes = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(Recipes_URL).get();
            Elements recipeElements = doc.select("div.taxonomy-featured");

            for (Element recipeElement : recipeElements) {
                String articleLink = recipeElement.select("a.btn.btn-blue").attr("abs:href");
                String articleTitle = recipeElement.select("h5").text();
                String articleDescription = recipeElement.select("p").text();

                String imageUrl = recipeElement.select("img").attr("data-src");
                if (imageUrl == null || imageUrl.isEmpty()) {
                    // Fallback: If data-src is missing, try absolute URL
                    imageUrl = recipeElement.select("img").attr("abs:src");
                }

                Recipe recipe = new Recipe();
                recipe.setTitle(articleTitle);
                recipe.setDescription(articleDescription);
                recipe.setLink(articleLink);
                recipe.setImageUrl(imageUrl != null ? imageUrl : recipeElement.select("img").attr("data-src"));

                recipes.add(recipe);
            }
        } catch (IOException e) {
            // Handle or log the exception
            e.printStackTrace();
        }

        recipeRepository.saveAll(recipes);
        System.out.print("Saved " + recipes.size() + " articles to the database.");
    }

    /* private String extractImageUrl(Element articleElement) {
        Element imgElement = articleElement.select("div.views-field-view-node-image img.views-field-view-node-image-url").first();
        if (imgElement != null) {
            String srcset = imgElement.attr("data-srcset");
            if (srcset != null && !srcset.isEmpty()) {
                // Find the index of the first occurrence of .jpg
                int endIndex = srcset.indexOf(".jpg") + 4; // Include .jpg in the substring
                // Extract the URL until the first occurrence of .jpg
                return srcset.substring(0, endIndex);
            }
        }
        return "";*/






}

