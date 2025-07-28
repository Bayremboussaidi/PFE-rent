    package com.example.comparateur.Controller;

    import java.io.IOException;
    import java.util.List;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.multipart.MultipartFile;
    
    import com.example.comparateur.DTO.PhotoResponseDTO;
    import com.example.comparateur.Service.PhotoService;
    
    @RestController
    @RequestMapping("/api/photos")
    @CrossOrigin(origins = "http://localhost:4200")
    public class PhotoController {
    
        @Autowired
        private PhotoService photoService;
    
        
        @PostMapping("/upload/{voitureId}")
        public ResponseEntity<?> uploadPhotos(
                @PathVariable Long voitureId,
                @RequestParam("files") MultipartFile[] files
        ) {
            try {
                List<PhotoResponseDTO> savedPhotos = photoService.saveMultiplePhotos(voitureId, files);
                return ResponseEntity.ok(savedPhotos);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to upload files: " + e.getMessage());
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(e.getMessage());
            }
        }
    
        //  Get All Photos by Voiture ID (Returns Base64)
        @GetMapping("/voiture/{voitureId}")
        public ResponseEntity<List<PhotoResponseDTO>> getPhotosByVoitureId(@PathVariable Long voitureId) {
            List<PhotoResponseDTO> dtos = photoService.getPhotosByVoitureId(voitureId);
            return ResponseEntity.ok(dtos);
        }
    
        // Delete all photos for a voiture
        @DeleteMapping("/voiture/{voitureId}")
        public ResponseEntity<Void> deletePhotosByVoitureId(@PathVariable Long voitureId) {
            photoService.deletePhotosByVoitureId(voitureId);
            return ResponseEntity.noContent().build();
        }
    }
    