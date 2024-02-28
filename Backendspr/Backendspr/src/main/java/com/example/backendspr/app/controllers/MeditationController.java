package com.example.backendspr.app.controllers;

import com.example.backendspr.app.models.Meditation;
import com.example.backendspr.app.models.Tip;
import com.example.backendspr.app.service.MeditationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meditations")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MeditationController {

    @Autowired
    private MeditationService meditationService;

    @GetMapping("/")
    public ResponseEntity<List<Meditation>> getAllMeditations() {
        List<Meditation> meditations = meditationService.getAll();
        return new ResponseEntity<>(meditations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meditation> getMeditationById(@PathVariable("id") Long id) {
        Meditation meditation = meditationService.getById(id);
        if (meditation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(meditation, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Meditation> createOrUpdateMeditation(@RequestBody Meditation meditation) {
        Meditation savedMeditation = meditationService.saveOrUpdate(meditation);
        return new ResponseEntity<>(savedMeditation, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeditation(@PathVariable("id") Long id) {
        Meditation meditation = meditationService.getById(id);
        if (meditation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        meditationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/{id}/tips")
    public ResponseEntity<List<Tip>> getAllTipsForMeditation(@PathVariable("id") Long id) {
        List<Tip> tips = meditationService.getAllTips(id);
        if (tips == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tips, HttpStatus.OK);
    }

    @PostMapping("/{id}/tips")
    public ResponseEntity<Meditation> addTipToMeditation(@PathVariable("id") Long id, @RequestBody Tip tip) {
        Meditation meditation = meditationService.getById(id);
        if (meditation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        meditation.getTips().add(tip); // Assuming getTips() returns a list
        meditationService.saveOrUpdate(meditation);
        return new ResponseEntity<>(meditation, HttpStatus.CREATED);
    }
}
