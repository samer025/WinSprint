package com.example.backendspr.Services.ServiceImpl;

import com.example.backendspr.Models.Diet;
import com.example.backendspr.Repositories.DietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backendspr.Services.Interfaces.DietService;
import java.util.List;
import java.util.Optional;

@Service
public class DietServiceImpl implements DietService {

    @Autowired
    private DietRepository dietRepository;

    @Override
    public List<Diet> getAllDiets() {
        return dietRepository.findAll();
    }

    @Override
    public Optional<Diet> getDietById(Long id) {
        return dietRepository.findById(id);
    }

    @Override
    public Diet updateDiet(Long id, Diet diet) {
        Optional<Diet> optionalDiet = dietRepository.findById(id);
        if (optionalDiet.isPresent()) {
            diet.setId(id);
            return dietRepository.save(diet);
        } else {
            throw new IllegalArgumentException("Diet with id " + id + " does not exist!");
        }
    }

    @Override
    public Diet addDiet(Diet diet) {
        return dietRepository.save(diet);
    }

    @Override
    public void deleteDiet(Long id) {
        dietRepository.deleteById(id);
    }
}
