package com.example.backend.Controllers;

import com.example.backend.Entities.FileEntity;
import com.example.backend.Repositories.fileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLConnection;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class FileController {

    @Autowired
    private fileRepository fileRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            FileEntity fileEntity = new FileEntity();
            fileEntity.setFilename(file.getOriginalFilename());
            // Automatically set contentType based on file extension
            String contentType = URLConnection.guessContentTypeFromName(file.getOriginalFilename());
            fileEntity.setContentType(contentType);

            fileEntity.setData(file.getBytes());
            fileRepository.save(fileEntity);
            String message = "File uploaded successfully!";
            HttpStatus httpStatus = HttpStatus.CREATED;
            return new ResponseEntity<>(message, httpStatus);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }


    @GetMapping("/files")
    public ResponseEntity<List<FileEntity>> getFile() {
        List<FileEntity> files = fileRepository.findAll();
        return ResponseEntity.ok(files);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable String id) {
        FileEntity fileEntity = fileRepository.findById(id).orElse(null);
        if (fileEntity != null) {
            HttpHeaders headers = new HttpHeaders();

            // Automatically set contentType based on file extension
            String contentType = URLConnection.guessContentTypeFromName(fileEntity.getFilename());
            headers.setContentType(MediaType.parseMediaType(contentType));

            headers.setContentDisposition(ContentDisposition.attachment().filename(fileEntity.getFilename()).build());
            ByteArrayResource resource = new ByteArrayResource(fileEntity.getData());
            return ResponseEntity.ok().headers(headers).body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}

