package com.example.backendspr.Services.Interfaces;

import com.example.backendspr.Models.User;
import com.example.backendspr.Models.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {
    
    List<User> getAllUsers();

    User getUserById(int idUser);

    User updateUser(User u, int idUser);

    public boolean updateUserWithoutPassword(Long userId, UserDTO updatedUserInfo);

    User editUser(int userId ,MultipartFile file, String username, String email, String firstname, 
    String lastname, String birthdate, String address, String phone) throws Exception;
}
