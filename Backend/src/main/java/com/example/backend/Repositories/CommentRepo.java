package com.example.backend.Repositories;

import com.example.backend.Entities.Comment;
import com.example.backend.Entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Set;

public interface CommentRepo extends MongoRepository<Comment,String> {



    Set<Comment> findCommentByPostId(String id);
}
