package com.example.backend.Controllers;

import com.example.backend.Entities.AD;
import com.example.backend.Services.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/ad")
public class AdController {

    @Autowired
    private AdService adService;


    @PostMapping("/add")
    public ResponseEntity<?> createAd(@RequestBody AD ad){
        try {
            AD createdAd = adService.saveAd(ad);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAd);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getall")
    public ResponseEntity <List<AD>>getAllAds(){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(adService.getAllAds());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?>getAdById(@PathVariable String id){
        try{
            AD ad = adService.getAdById(id);
            return ResponseEntity.ok(ad);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
    }
@PutMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable String id){
        try{
            adService.likeAd(id);
            return ResponseEntity.ok(new String[]{
                    "Ad liked successfully"
            });
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
@GetMapping("/search/{postedBy}")
ResponseEntity<?> searchBy(@PathVariable String postedBy){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(adService.searchByPostedBy(postedBy));
        }catch(Exception e ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
}
@DeleteMapping("/delete/{id}")
ResponseEntity<?> deleteBY(@PathVariable String id){
        try{
            adService.deleteAd(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(Exception e ){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

    }
}



}
