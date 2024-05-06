package com.coco.pibackend.Service;

import com.coco.pibackend.Entity.Claims;
import com.coco.pibackend.Entity.User;
import com.coco.pibackend.Enum.StatusClaims;
import com.coco.pibackend.Enum.TypeClaim;

import java.util.List;
import java.util.Map;


public interface ClaimService  {
    public Claims addClaims( Claims claims) ;
    public Claims getClaimsById(Integer idClaims);
    public List<Claims> GetClaims() ;
    public List<Claims> findByUser(Integer id) ;
    public Claims Update( Claims claims) ;
    public Claims statusClaims(Integer idClaims , String status) ;
    public void deleteClaims(Integer idClaims );
    public Map<TypeClaim, Double> calculateClaimPercentage();


}
