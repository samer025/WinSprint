package com.example.backend.Services;

import com.example.backend.Entities.Post;
import com.example.backend.Entities.Story;
import com.example.backend.Repositories.StoryRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class StoryService {

    private  StoryRepo storyRepo;


    public Story saveStory(Story story){
        story.setLikes(0);
        story.setViews(0);
        story.setDate(new Date());

        return storyRepo.save(story);

    }

    public List<Story> getAllStories(){
        return storyRepo.findAll();
    }



}
