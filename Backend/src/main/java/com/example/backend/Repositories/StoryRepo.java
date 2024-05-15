package com.example.backend.Repositories;

import com.example.backend.Entities.Post;
import com.example.backend.Entities.Story;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepo extends MongoRepository<Story,String> {


}
