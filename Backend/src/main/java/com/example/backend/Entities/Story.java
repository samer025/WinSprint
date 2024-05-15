package com.example.backend.Entities;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Story {


    @Id
    String id;
    String Content ;
    Set<FileEntity>images;
    Integer likes;
    Integer views;
    Date date;
    String storyedBy;
    List<String> tags;
    String artistName;
    String trackName;




}
