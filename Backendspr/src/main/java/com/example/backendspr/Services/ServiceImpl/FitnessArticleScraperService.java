package com.example.backendspr.Services.ServiceImpl;

import com.example.backendspr.Models.Article;
import com.example.backendspr.Repositories.ArticleRepository;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FitnessArticleScraperService {

    @Autowired
    private ArticleRepository articleRepository;

    private static final String FITNESS_ARTICLES_URL = "https://www.muscleandstrength.com/articles/interviews";

    @PostConstruct
    public void scrapeAndSaveFitnessArticles() {
        List<Article> articles = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(FITNESS_ARTICLES_URL).get();
            Elements articleElements = doc.select("div.taxonomy-featured");

            for (Element articleElement : articleElements) {
                String articleLink = articleElement.select("a.btn.btn-blue").attr("abs:href");
                String articleTitle = articleElement.select("h5").text();
                String articleDescription = articleElement.select("p").text();

                String imageUrl = articleElement.select("img").attr("data-src");
                if (imageUrl == null || imageUrl.isEmpty()) {
                    // Fallback: If data-src is missing, try absolute URL
                    imageUrl = articleElement.select("img").attr("abs:src");
                }

                Article article = new Article();
                article.setTitle(articleTitle);
                article.setDescription(articleDescription);
                article.setLink(articleLink);
                article.setImageUrl(imageUrl != null ? imageUrl : articleElement.select("img").attr("data-src"));

                articles.add(article);
            }
        } catch (IOException e) {
            // Handle or log the exception
            e.printStackTrace();
        }

        articleRepository.saveAll(articles);
        System.out.print("Saved " + articles.size() + " articles to the database.");
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
