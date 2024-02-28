package com.example.backendspr.app.controllers;

import com.example.backendspr.app.models.Relaxation;
import com.example.backendspr.app.models.Tip;
import com.example.backendspr.app.service.RelaxationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relaxations")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class RelaxationController {

    @Autowired
    private RelaxationService relaxationService;

    @GetMapping("/")
    public ResponseEntity<List<Relaxation>> getAllRelaxations() {
        List<Relaxation> relaxations = relaxationService.getAll();
        return new ResponseEntity<>(relaxations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Relaxation> getRelaxationById(@PathVariable("id") Long id) {
        Relaxation relaxation = relaxationService.getById(id);
        if (relaxation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(relaxation, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Relaxation> createOrUpdateRelaxation(@RequestBody Relaxation relaxation) {
        Relaxation savedRelaxation = relaxationService.saveOrUpdate(relaxation);
        return new ResponseEntity<>(savedRelaxation, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelaxation(@PathVariable("id") Long id) {
        Relaxation relaxation = relaxationService.getById(id);
        if (relaxation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        relaxationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/{id}/tips")
    public ResponseEntity<List<Tip>> getAllTipsForRelaxation(@PathVariable("id") Long id) {
        List<Tip> tips = relaxationService.getAllTips(id);
        if (tips == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tips, HttpStatus.OK);
    }

    @PostMapping("/{id}/tips")
    public ResponseEntity<Relaxation> addTipToRelaxation(@PathVariable("id") Long id, @RequestBody Tip tip) {
        Relaxation relaxation = relaxationService.getById(id);
        if (relaxation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        relaxation.getTips().add(tip); // Assuming getTips() returns a list
        relaxationService.saveOrUpdate(relaxation);
        return new ResponseEntity<>(relaxation, HttpStatus.CREATED);
    }


}
