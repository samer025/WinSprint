package com.example.backendspr.Services.Interfaces;
import com.example.backendspr.Models.Program;

import java.util.List;
import java.util.Optional;

public interface ProgramService {
    List<Program> getAllPrograms();

    Optional<Program> getProgramById(Long id);

    Program addProgram(Program program, Long userId);

    Program updateProgram(Long id,Program program);
    void deleteProgram(Long id);
}

