package com.coco.pibackend.Service;

import com.coco.pibackend.Entity.Claims;
import com.coco.pibackend.Entity.User;
import com.coco.pibackend.Enum.StatusClaims;
import com.coco.pibackend.Enum.TypeClaim;
import com.coco.pibackend.Repo.ClaimsRepository;
import com.coco.pibackend.Repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
@Service
@AllArgsConstructor
public class ClaimsServices implements ClaimService {
    private final String ACCOUNT_SID = "AC81907b120a7f0324b879cccf07a26746";
    private final String AUTH_TOKEN = "3784ab1b875a85ebd5de23a3473c556f";
    private final String TWILIO_PHONE_NUMBER = "+12567334733";
    @Autowired
    ClaimsRepository claimsRepository;
    UserRepository UserRepository;
    private MessageSendingOperations<String> wsTemplate;
    @Override
    public Claims addClaims( Claims claims) {
        Optional<User> u=UserRepository.findById(claims.getUser().getId_user());
        if(u.isPresent()){

        claims.setUser(u.get());
        claims.setCreatedAt(LocalDateTime.now());
        claims.setStatusClaims(StatusClaims.valueOf("Pending"));
        wsTemplate.convertAndSend("/topic/notification/" ,  u.get().getUsername()+" a ajouté une nouvelle reclamtion");

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
    public List<Claims> findByUser(Integer id) {
        Optional<User> u =UserRepository.findById(id);
        if(u.isPresent()){
            return claimsRepository.findByUser(u.get());
        }
        else return null;
    }

    @Override
   public Claims statusClaims(Integer idClaims, String status) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
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
        Message message = Message.creator(
                        new PhoneNumber("+21658218173"),
                        new PhoneNumber(TWILIO_PHONE_NUMBER),
                        m)
                .create();
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
