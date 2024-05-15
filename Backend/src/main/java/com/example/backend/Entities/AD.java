package com.example.backend.Entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AD {

    @Id
    String id;


    //set the lenght to 5000
    String content;
    String postedBy;
    String img;
    Date date;
    int likeCount;
    int viewCount;
    List<String> tags;
    @DBRef
    Comment comment;





}
