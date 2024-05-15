package com.example.backend.Services;

import com.example.backend.Entities.AD;
import com.example.backend.Entities.Post;
import com.example.backend.Repositories.CommentRepo;
import com.example.backend.Repositories.PostRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepo postRepo;
    private final CommentService commentService;



    public Post Update(Post p){
        return postRepo.save(p);
    }

    public Post savePost(Post post){
        post.setLikeCount(0);
        post.setViewCount(0);
        post.setDate(new Date());
        
        return postRepo.save(post);

    }
    public void deletePost(String id){
        postRepo.deleteById(id);
    }


    public List<Post> getAllPost(){
        List<Post> posts=postRepo.findAll();

        return posts;
    }



    public Optional<Post> getPost(String id){
        return postRepo.findById(id);
    }


    public void likePost(String id) throws Exception {
        Optional<Post> optionalPost= postRepo.findById(id);
        if(optionalPost.isPresent()){
            Post post = optionalPost.get();
            post.setLikeCount(post.getLikeCount()+1);
            postRepo.save(post);
        }else {
            throw new Exception("Post not found with the id:" + id);
        }
    }
}
