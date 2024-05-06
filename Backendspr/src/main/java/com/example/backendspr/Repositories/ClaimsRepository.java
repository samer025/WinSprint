package com.example.backendspr.Repositories;


import com.example.backendspr.Models.Claims;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimsRepository extends JpaRepository<Claims, Integer> {
    public Claims findByIdClaims (Integer idClaims);
    List<Claims> findByUser(com.example.backendspr.Models.User u);
}