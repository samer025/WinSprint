package com.example.backendspr.Repositories;

import com.example.backendspr.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food,Long>  {

}