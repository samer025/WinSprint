package com.example.backend.Repositories;

import com.example.backend.Entities.AD;
import com.example.backend.Entities.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepo extends MongoRepository<AD,String> {
    AD findByComment(Comment comment);
    List<AD>findAllByPostedBy(String postedBy);


}
