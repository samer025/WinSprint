package com.example.backendspr.Services.Interfaces;



import com.example.backendspr.Models.Claims;
import com.example.backendspr.Models.TypeClaim;

import java.util.List;
import java.util.Map;


public interface ClaimService {
    public Claims addClaims(Claims claims) ;
    public Claims getClaimsById(Integer idClaims);
    public List<Claims> GetClaims() ;
    public List<Claims> findByUser(Long id) ;
    public Claims Update( Claims claims) ;
    public Claims statusClaims(Integer idClaims , String status) ;
    public void deleteClaims(Integer idClaims );
    public Map<TypeClaim, Double> calculateClaimPercentage();


}
