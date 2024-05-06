package com.example.backendspr.Services.ServiceImpl;


import com.example.backendspr.Models.Claims;
import com.example.backendspr.Models.StatusClaims;
import com.example.backendspr.Models.TypeClaim;
import com.example.backendspr.Repositories.ClaimsRepository;
import com.example.backendspr.Repositories.UserRepository;
import com.example.backendspr.Services.Interfaces.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ClaimsServices implements ClaimService {

    @Autowired
    ClaimsRepository claimsRepository;
    @Autowired
    UserRepository UserRepository;

    @Override
    public Claims addClaims(Claims claims) {
        Optional<com.example.backendspr.Models.User> u=UserRepository.findById(1L);
        if(u.isPresent()){

        claims.setUser(u.get());
        claims.setCreatedAt(LocalDateTime.now());
        claims.setStatusClaims(StatusClaims.valueOf("Pending"));


            return claimsRepository.save(claims);}
        return null;
    }
    @Override
    public Claims getClaimsById(Integer id) {
        Claims getRec =claimsRepository.findById(id).orElse(null);
            return getRec;
        }

    @Override
    public List<Claims> GetClaims() {
        return claimsRepository.findAll();
    }

    public Page<Claims> getClaimsWithPagination(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return claimsRepository.findAll(pageRequest);
    }
    @Override
    public List<Claims> findByUser(Long id) {
        Optional<com.example.backendspr.Models.User> u =UserRepository.findById(id);
        if(u.isPresent()){
            return claimsRepository.findByUser(u.get());
        }
        else return null;
    }

    @Override
   public Claims statusClaims(Integer idClaims, String status) {

        String m=null;
       Claims treatedClaim= claimsRepository.findByIdClaims(idClaims);

       if(Objects.equals(status, "rejected")){
           treatedClaim.setStatusClaims(StatusClaims.Rejected);
           m="Désolé L'administrateur a rejeter votre réclamation";

       } else if (Objects.equals(status, "resolved")) {
           treatedClaim.setStatusClaims(StatusClaims.Resolved);
           m="L'administrateur a Fixer votre réclamation";
       }else {
           treatedClaim.setStatusClaims(StatusClaims.In_process);
           m="Votre réclamation est entrain de process";
       }
        treatedClaim.setConsultAt(LocalDateTime.now());

        return claimsRepository.save(treatedClaim);
    }
    @Override
    public void deleteClaims(Integer idClaims) {
        claimsRepository.deleteById(idClaims) ;

    }
    @Override
    public Claims Update( Claims claims){
        Claims getRec =claimsRepository.findById(claims.getIdClaims()).orElse(null);
        if(getRec!=null){
            getRec.setTitle(claims.getTitle());
            getRec.setDescription(claims.getDescription());
            getRec.setTypeClaim(claims.getTypeClaim());
            if(claims.getTypeClaim().toString()=="Other"){
                getRec.setOtherDetails(claims.getOtherDetails());
            }
            else {
                getRec.setOtherDetails(null);

            }
            getRec.setCreatedAt(LocalDateTime.now());
            return claimsRepository.save(getRec);
        }
        return null;
    }

    @Override
    public Map<TypeClaim, Double> calculateClaimPercentage() {
        Map<TypeClaim, Double> claimPercentageMap = new HashMap<>();
        int totalClaims = 0;
        List<Claims> allClaims = claimsRepository.findAll();
        for (Claims claim : allClaims) {
            totalClaims++;
            TypeClaim type = claim.getTypeClaim();
            claimPercentageMap.put(type, claimPercentageMap.getOrDefault(type, 0.0) + 1);
        }
        for (Map.Entry<TypeClaim, Double> entry : claimPercentageMap.entrySet()) {
            double percentage = (entry.getValue() / totalClaims) * 100;
            claimPercentageMap.put(entry.getKey(), percentage);
        }

        return claimPercentageMap;
    }


}
