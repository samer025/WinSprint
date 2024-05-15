package com.example.backend.Repositories;

import com.example.backend.Entities.FileEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface fileRepository extends MongoRepository<FileEntity,String> {
}
