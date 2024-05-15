package com.example.backend.Controllers;
import com.example.backend.Entities.FileEntity;
import com.example.backend.Entities.Story;
import com.example.backend.Services.StoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.URLConnection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/story")
public class StoryController {
    @Autowired
    private StoryService storyService;


    @PostMapping("/saveStory")
    public ResponseEntity<?> saveStory(@RequestParam("story") String storyJson,
                                       @RequestParam("files") MultipartFile[] files,
                                       @RequestParam("artistName") String artistName,
                                       @RequestParam("trackName") String trackName ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Story story = objectMapper.readValue(storyJson, Story.class);
            Set<FileEntity> images = uploadImages(files);
            story.setImages(images);
            story.setArtistName(artistName);
            story.setTrackName(trackName);
            storyService.saveStory(story);
            return ResponseEntity.status(HttpStatus.CREATED).body("story created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving story.");
        }
    }

    private Set<FileEntity> uploadImages(MultipartFile[] files) throws IOException {
        Set<FileEntity> images = new HashSet<>();
        for (MultipartFile file : files) {
            FileEntity fileEntity = new FileEntity();
            fileEntity.setFilename(file.getOriginalFilename());

            // Automatically set contentType based on file extension
            String contentType = URLConnection.guessContentTypeFromName(file.getOriginalFilename());
            fileEntity.setContentType(contentType);

            fileEntity.setData(file.getBytes());
            images.add(fileEntity);
        }
        return images;
    }




    @GetMapping("/getAll")
    public List<Story> getAllStories(){
        return storyService.getAllStories();
    }
}
