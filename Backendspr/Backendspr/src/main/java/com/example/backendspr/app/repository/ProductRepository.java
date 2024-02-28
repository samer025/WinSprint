package com.example.backendspr.app.repository;

import com.example.backendspr.app.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}