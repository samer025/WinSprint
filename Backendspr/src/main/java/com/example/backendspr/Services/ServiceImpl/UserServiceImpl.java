package com.example.backendspr.Services.ServiceImpl;


import com.example.backendspr.models.User;
import com.example.backendspr.Models.UserDTO;
import com.example.backendspr.Repositories.UserRepository;
import com.example.backendspr.Services.Interfaces.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyDescriptor;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int idUser) {
        Optional<User> user = userRepository.findById((long) idUser);
        return user.get();
    }

    @Override
    public User updateUser(User u, int idUser) {
        User updatedUser = userRepository.findById((long) idUser).orElseThrow(null);
        updatedUser.setEmail(u.getEmail());
        updatedUser.setUsername(u.getUsername());
        updatedUser.setPassword(u.getPassword());
        return userRepository.save(updatedUser);
    }

    @Override
    public boolean updateUserWithoutPassword(Long userId, UserDTO updatedUserInfo) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Copy non-null properties from updatedUserInfo to user
            BeanUtils.copyProperties(updatedUserInfo, user, getNullPropertyNames(updatedUserInfo));

            userRepository.save(user);
            return true;
        }

        return false; // User not found
    }

    // Helper method to get null property names
    private static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }

        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    @Override
    public User editUser(int userId, MultipartFile file, String username, String email, String firstname, String lastname,
        String birthdate, String address, String phone) throws Exception {

            User updatedUser = userRepository.findById((long) userId).orElseThrow(null);
            

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                throw  new Exception("Filename contains invalid path sequence "
                        + fileName);
            }

            Date parsedBirthdate = parseDate(birthdate);

            updatedUser.setUsername(username);
            updatedUser.setEmail(email);
            updatedUser.setFirstname(firstname);
            updatedUser.setLastname(lastname);
            updatedUser.setBirthdate(parsedBirthdate);
            updatedUser.setAddress(address);
            updatedUser.setPhone(phone);
            
            return userRepository.save(updatedUser);

        } catch (Exception e) {
            throw new Exception("Could not save User: " + username);
        }
    }

    private Date parseDate(String dateStr) throws ParseException, ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        return dateFormat.parse(dateStr);
    }

    public boolean isLoggedIn() {
        // Get the authentication object from the security context
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Check if the principal is an instance of UserDetails
        return principal instanceof UserDetails;
    }

    @Override
    public boolean deleteUser(int idUser) {
        Optional<User> userOptional = userRepository.findById(Long.valueOf(idUser));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
            return true;
        }
        return false;
    }
    
}
