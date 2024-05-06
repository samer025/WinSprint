package com.example.backendspr.Controller;


import com.example.backendspr.Models.Claims;
import com.example.backendspr.Models.TypeClaim;
import com.example.backendspr.Services.ServiceImpl.ClaimsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
    public class ClaimsController {
    @Autowired
    ClaimsServices claimService;

    @PostMapping("/api/addClaim")
    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
    public Claims AddClaim(@RequestBody Claims claims) {

        return claimService.addClaims(claims);

    }
    @GetMapping("/api/GetALLClaims")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Claims> GetALLClaims(){
        return claimService.GetClaims();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/api/findByUser/{id}")
    public List<Claims> findByUser(@PathVariable("id") Long id){
        return claimService.findByUser(id);
    }


    @GetMapping("/api/GetClaimsById/{idClaims}")
    @CrossOrigin(origins = "http://localhost:4200")
    public  Claims GetClaimsById(@PathVariable Integer idClaims){
        return claimService.getClaimsById(idClaims);
    }
    
    @PutMapping("/api/statusClaims/{idClaims}/{status}")
    @CrossOrigin(origins = "http://localhost:4200")
    public Claims statusClaims(@PathVariable("idClaims") Integer idClaims,@PathVariable("status") String status) {
        return claimService.statusClaims(idClaims,status);
    }
    @DeleteMapping("/api/DeleteClaims/{idClaims}")
    @CrossOrigin(origins = "http://localhost:4200")
    public void Delete(@PathVariable Integer idClaims){
         claimService.deleteClaims( idClaims);
    }

    @PutMapping("/api/UpdateClaims")
    @CrossOrigin(origins = "http://localhost:4200")
    public Claims UpdateClaims(@RequestBody Claims claims) {
      return  claimService.Update(claims);

    }
    @GetMapping("/api/claims/page")
    public Page<Claims> getClaimsByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        return claimService.getClaimsWithPagination(page, size);
    }
    @GetMapping("/api/calculateClaimPercentage")
    @CrossOrigin(origins = "http://localhost:4200")
   public Map<TypeClaim, Double> calculateClaimPercentage(){
        return claimService.calculateClaimPercentage();
    }


}

