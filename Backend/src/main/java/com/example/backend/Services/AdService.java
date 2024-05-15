package com.example.backend.Services;

import com.example.backend.Entities.AD;
import com.example.backend.Entities.Post;
import com.example.backend.Repositories.AdRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AdService {
    @Autowired     //automatic dependency injection
    private AdRepo adRepo;




    public AD saveAd(AD ad){
        ad.setLikeCount(0);
        ad.setViewCount(0);
        ad.setDate(new Date());
        return adRepo.save(ad);

    }

    public List<AD> getAllAds(){
        return adRepo.findAll();
    }

    public AD getAdById(String id) throws Exception {
        Optional<AD> optionalAD = adRepo.findById(id);
        if (optionalAD.isPresent()){
            AD ad = optionalAD.get();
            ad.setViewCount(ad.getViewCount() + 1);
            return adRepo.save(ad);
        }else {
            throw new Exception ("AD not found");
        }
    }

    public void likeAd(String id) throws Exception {
        Optional<AD> optionalAD= adRepo.findById(id);
        if(optionalAD.isPresent()){
            AD ad = optionalAD.get();
            ad.setLikeCount(ad.getLikeCount()+1);
            adRepo.save(ad);
        }else {
            throw new Exception("Ad not found with the id:" + id);
        }
    }
    public List<AD>searchByPostedBy(String postedBy){
        return adRepo.findAllByPostedBy(postedBy);
    }


    public void deleteAd(String id){
         adRepo.deleteById(id);
    }




}
