package com.example.backendspr.Services.ServiceImpl;
import com.example.backendspr.Models.Program;
import com.example.backendspr.models.User;
import com.example.backendspr.Repositories.ProgramRepository;
import com.example.backendspr.Repositories.UserRepository;
import com.example.backendspr.Services.Interfaces.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramServiceImpl implements ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @Override
    public Optional<Program> getProgramById(Long id) {
        return programRepository.findById(id);
    }

    @Override
    public Program updateProgram(Long id, Program program) {
        // Check if the program with the given ID exists
        Optional<Program> optionalProgram = programRepository.findById(id);
        if (optionalProgram.isPresent()) {
            // Update the program's details
            program.setId(id); // Set the ID of the program to be updated
            return programRepository.save(program);
        } else {
            throw new IllegalArgumentException("Program with id " + id + " does not exist!");
        }
    }


    @Override
    public Program addProgram(Program program, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            program.setUser(optionalUser.get());
            return programRepository.save(program);
        } else {
            // Handle case where user does not exist
            throw new IllegalArgumentException("User with id " + userId + " does not exist!");
        }
    }

    @Override
    public void deleteProgram(Long id) {
        programRepository.deleteById(id);
    }
}
