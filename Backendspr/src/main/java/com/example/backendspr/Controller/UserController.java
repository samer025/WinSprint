package com.example.backendspr.Controller;

import com.example.backendspr.Models.User;
import com.example.backendspr.Models.UserDTO;
import com.example.backendspr.Services.Interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User>getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getOneUser(@PathVariable int id){
        return userService.getUserById(id);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody User u , @PathVariable int id){
        return userService.updateUser(u, id);
    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<String> updateUserWithoutPassword(@PathVariable Long userId, @RequestBody UserDTO updatedUserInfo) {
        boolean updated = userService.updateUserWithoutPassword(userId, updatedUserInfo);

        if (updated) {
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}
