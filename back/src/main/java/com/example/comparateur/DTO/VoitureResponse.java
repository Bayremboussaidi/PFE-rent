package com.example.comparateur.DTO;

import java.util.List;

import com.example.comparateur.Entity.Review;
import com.example.comparateur.Entity.Voiture;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoitureResponse {
    private Long id;
    private String carName;
    private String brand;
    private String category;
    private String transmission;
    private String toit;
    private String carburant;
    private double price;
    private boolean featured;
    private String agence;
    private String local;

    private String description;
    private boolean disponible;
    private String matricule; 
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String updatedAt;
    
    private List<PhotoResponseDTO> images;
    private List<Review> reviews;

    public VoitureResponse(Voiture voiture, List<PhotoResponseDTO> images, List<Review> reviews) {
        this.id = voiture.getId();
        this.carName = voiture.getCarName();
        this.brand = voiture.getBrand();
        this.category = voiture.getCategory();
        this.transmission = voiture.getTransmission();
        this.toit = voiture.getToit();
        this.carburant = voiture.getCarburant();
        this.price = voiture.getPrice();
        this.featured = voiture.isFeatured();
        this.agence = voiture.getAgence();
        this.local = voiture.getLocal();
        this.description = voiture.getDescription();
        this.disponible = voiture.isDisponible();
        this.createdAt = voiture.getCreatedAt() != null ? voiture.getCreatedAt().toString() : null;
        this.updatedAt = voiture.getUpdatedAt() != null ? voiture.getUpdatedAt().toString() : null;
        this.images = images != null ? images : List.of();
        this.reviews = reviews != null ? reviews : List.of();
        

        this.matricule = voiture.getMatricule();
    }
}