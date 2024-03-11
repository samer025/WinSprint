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

    private static final String FITNESS_ARTICLES_URL = "https://www.bodybuilding.com/category/training";

    @PostConstruct
    public void scrapeAndSaveFitnessArticles() {
        List<Article> articles = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(FITNESS_ARTICLES_URL).get();
            Elements articleElements = doc.select("#content-area > div > div.cms-article-list--container > span");

            for (Element articleElement : articleElements) {
                String articleLink = articleElement.select("a").attr("href");
                String articleTitle = articleElement.select("h3.title").text();
                String articleDescription = articleElement.select("span.description").text();
                String imageUrl = extractImageUrl(articleElement);

                Article article = new Article();
                article.setTitle(articleTitle);
                article.setDescription(articleDescription);
                article.setLink(articleLink);
                article.setImageUrl(imageUrl);

                articles.add(article);
            }
        } catch (IOException e) {
            // Handle or log the exception
            e.printStackTrace();
        }

        articleRepository.saveAll(articles);
    }

    private String extractImageUrl(Element articleElement) {
        Element imgElement = articleElement.select("a.thumb-container > div.thumb.lazyload-spinner > img").first();
        if (imgElement != null) {
            String srcset = imgElement.attr("data-srcset");
            if (srcset != null && !srcset.isEmpty()) {
                // Find the index of the first occurrence of .jpg
                int endIndex = srcset.indexOf(".jpg") + 4; // Include .jpg in the substring
                // Extract the URL until the first occurrence of .jpg
                return srcset.substring(0, endIndex);
            }
        }
        return "";
    }






}
