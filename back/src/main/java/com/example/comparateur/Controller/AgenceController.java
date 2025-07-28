package com.example.comparateur.Controller;

import java.util.Base64;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.comparateur.DTO.AGENCE.AgenceRequestDTO;
import com.example.comparateur.DTO.AGENCE.AgenceResponseDTO;
import com.example.comparateur.DTO.AGENCE.AgenceUpdateDTO;
import com.example.comparateur.Exception.AgencyAlreadyExistsException;
import com.example.comparateur.Exception.AgencyNotFoundException;
import com.example.comparateur.Service.AgenceService;

import io.jsonwebtoken.io.IOException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/agence")
@CrossOrigin(origins = "http://localhost:4200")
public class AgenceController {

    private final AgenceService agenceService;

    public AgenceController(AgenceService agenceService) {
        this.agenceService = agenceService;
    }


    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAgence(
        @RequestPart("agencyName") String agencyName,
        @RequestPart("email") String email,
        @RequestPart("password") String password,
        @RequestPart("phoneNumber") String phoneNumber,
        @RequestPart("city") String city,
        @RequestPart(value = "photo", required = false) MultipartFile photo) throws java.io.IOException {
        
        AgenceRequestDTO agenceDTO = new AgenceRequestDTO();
        agenceDTO.setAgencyName(agencyName);
        agenceDTO.setEmail(email);
        agenceDTO.setPassword(password);
        agenceDTO.setPhoneNumber(phoneNumber);
        agenceDTO.setCity(city);
    
        if (photo != null && !photo.isEmpty()) {
            try {
                String base64Photo = Base64.getEncoder().encodeToString(photo.getBytes());
                agenceDTO.setPhoto(base64Photo); // ✅ now it's a String
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid photo upload");
            }
        }
    
        try {
            AgenceResponseDTO createdAgence = agenceService.createAgence(agenceDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAgence);
        } catch (AgencyAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    

    @GetMapping
    public ResponseEntity<Page<AgenceResponseDTO>> getAllAgences(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(agenceService.getAllAgences(pageable));
    }




    @GetMapping("/all")
public ResponseEntity<List<AgenceResponseDTO>> getAllAgences() {
    List<AgenceResponseDTO> agences = agenceService.getAllAgenceDetails();
    return ResponseEntity.ok(agences);
}



    @GetMapping("/{id}")
    public ResponseEntity<AgenceResponseDTO> getAgenceById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(agenceService.getAgenceById(id));
        } catch (AgencyNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAgence(
            @PathVariable Long id,
            @Valid @RequestBody AgenceUpdateDTO updateDTO) {
        try {
            AgenceResponseDTO updatedAgence = agenceService.updateAgence(id, updateDTO);
            return ResponseEntity.ok(updatedAgence);
        } catch (AgencyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AgencyAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgence(@PathVariable Long id) {
        try {
            agenceService.deleteAgence(id);
            return ResponseEntity.noContent().build();
        } catch (AgencyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<AgenceResponseDTO>> searchAgencies(
            @RequestParam String query,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(agenceService.searchAgencies(query, pageable));
    }

    /*@GetMapping("/all")
    public ResponseEntity<List<AgenceResponseDTO>> getAllAgencies() {
        //return ResponseEntity.ok(agenceService.getAllAgencies());
    }*/
}