package com.example.backendspr.Repositories;

import com.example.backendspr.Models.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article,Long> {
}
