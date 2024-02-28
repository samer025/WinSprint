package com.example.backendspr.app.repository;

import com.example.backendspr.app.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food,Long> {

}