package com.example.backend.Controllers;

import com.example.backend.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comment")
public class CommentController {


    @Autowired
    private CommentService commentService;


    @PostMapping("/add")
    public ResponseEntity<?> createComment(@RequestParam String postId,@RequestParam String postedBy,@RequestBody String content ){
        try{
            return ResponseEntity.ok(commentService.createComment(postId,postedBy,content));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());

        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentByPostId(@PathVariable String id){
        try{
            return ResponseEntity.ok(commentService.getCommentByPostId(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

}
