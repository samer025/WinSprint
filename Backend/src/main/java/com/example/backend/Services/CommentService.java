package com.example.backend.Services;

import com.example.backend.Entities.Comment;
import com.example.backend.Entities.Post;
import com.example.backend.Repositories.CommentRepo;
import com.example.backend.Repositories.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;



    @Autowired
    private PostRepo postRepo;

     public Comment createComment(String Adid,String postedBy,String content){
         Optional<Post> optionalAD= postRepo.findById((Adid));
         if(optionalAD.isPresent()){
            Comment comment =new Comment();
            comment.setPost(optionalAD.get());
            comment.setContent(content);
            comment.setPostedBy(postedBy);
            comment.setCreatedAt(new Date());
            return commentRepo.save(comment);
         }
         throw new RuntimeException("POST Not found" );
     }

     public Set<Comment> getCommentByPostId(String id){
         return (Set<Comment>)  commentRepo.findCommentByPostId(id);

     }

}
