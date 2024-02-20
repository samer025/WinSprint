package com.example.backendspr.repository;

import com.example.backendspr.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}