package com.example.backend.Controllers;

import com.example.backend.Entities.FileEntity;
import com.example.backend.Entities.Image;
import com.example.backend.Entities.MusicInfo;
import com.example.backend.Entities.Post;
import com.example.backend.Services.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLConnection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/post")
public class PostController {


    @Autowired //automatic dependency injection
    private PostService postService;




    @PostMapping("/savePost")
    public ResponseEntity<?> savePost(@RequestParam("post") String postJson,
                                      @RequestParam("files") MultipartFile[] files) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Post post = objectMapper.readValue(postJson, Post.class);
            Set<FileEntity> images = uploadImages(files);
            post.setImages(images);

            postService.savePost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving post.");
        }
    }



    private Set<FileEntity> uploadImages(MultipartFile[] files) throws IOException {
        Set<FileEntity> images = new HashSet<>();
        for (MultipartFile file : files) {
            FileEntity fileEntity = new FileEntity();
            fileEntity.setFilename(file.getOriginalFilename());

            // Automatically set contentType based on file extension
            String contentType = URLConnection.guessContentTypeFromName(file.getOriginalFilename());
            fileEntity.setContentType(contentType);

            fileEntity.setData(file.getBytes());
            images.add(fileEntity);
        }
        return images;
    }









    // http://localhost:8080/socialMedia/api/v1/post/getall
    @GetMapping( "/getall")
    List<Post> getPosts() {

        return postService.getAllPost();
    }
    // http://localhost:8080/socialMedia/api/v1/post/edit/{id}
    @PutMapping( "/edit/{id}")
    Post update(@RequestBody Post p, @PathVariable(name = "id") String id) {
        p.setId(id);
        return postService.Update(p);

    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deleteBY(@PathVariable String id){
        try{
            postService.deletePost(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(Exception e ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    // http://localhost:8080/socialMedia/api/v1/post/get/{id}
    @GetMapping("/get/{id}")
    Optional<Post> getPost (@PathVariable("id") String id){

        return postService.getPost(id);
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable String id){
        try{
            postService.likePost(id);
            return ResponseEntity.ok(new String[]{
                    "Post liked successfully"
            });
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }






}


