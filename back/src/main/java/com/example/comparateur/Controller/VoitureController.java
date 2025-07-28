package com.example.comparateur.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.comparateur.DTO.ApiResponse;
import com.example.comparateur.Entity.Voiture;
import com.example.comparateur.Service.VoitureService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/voitures")
@CrossOrigin(origins = "http://localhost:4200")
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @Autowired
    private ObjectMapper objectMapper;

    //  Create a new voiture
    @PostMapping
    public ResponseEntity<ApiResponse<Voiture>> createVoiture(@RequestBody Voiture voiture) {
        return voitureService.createVoiture(voiture);
    }

    //  Update a voiture (with optional image)
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> updateVoiture(
            @PathVariable Long id,
            @RequestPart("voiture") String voitureJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            Voiture voiture = objectMapper.readValue(voitureJson, Voiture.class);
            return voitureService.updateVoiture(id, voiture, file);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse<>(false, "Invalid JSON format: " + e.getMessage()));
        }
    }

    //  Get all voitures (Paginated)
    @GetMapping
    public ResponseEntity<Object> getAllVoitures() {
        return voitureService.getAllVoitures();
    }


    
    //  Get voiture by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneVoiture(@PathVariable Long id) {
        return voitureService.getOneVoiture(id);
    }

    // Get voiture count (Fix for frontend mismatch)
    @GetMapping("/search/getVoitureCount")
    public ResponseEntity<Object> getVoitureCount() {
        return voitureService.getVoitureCount();
    }

    //  Get all voitures with details
    @GetMapping("/all/details")
    public ResponseEntity<Object> getAllVoituresWithDetails() {
        return voitureService.getAllVoituresWithDetails();
    }




    // get all voiture details of agence
    @GetMapping("/agence/{agenceName}")
    public ResponseEntity<Object> getVoituresByAgenceWithDetails(
        @PathVariable String agenceName
        ) {
    return voitureService.getVoituresByAgenceWithDetails(agenceName);
    }

    //  Delete a voiture
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVoiture(@PathVariable Long id) {
        return voitureService.deleteVoiture(id);
    }

    //  Get reviews for a voiture
    @GetMapping("/{id}/reviews")
    public ResponseEntity<Object> getReviewsForVoiture(@PathVariable Long id) {
        return voitureService.getReviewsForVoiture(id);
    }
}
