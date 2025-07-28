package com.example.comparateur.DTO;

import java.util.Date;

import com.example.comparateur.Entity.Review;
import com.example.comparateur.Entity.Voiture;

public class ReviewDTO {
    private Long id;
    private String username;
    private String reviewText;
    private int rating;
    private Date createdAt;
    private Date updatedAt;
    private String carName;

    // Constructors
    public ReviewDTO() {}

    public ReviewDTO(Review review, Voiture voiture) {
        this.id = review.getId();
        this.username = review.getUsername();
        this.reviewText = review.getReviewText();
        this.rating = review.getRating();
        this.createdAt = review.getCreatedAt();
        this.updatedAt = review.getUpdatedAt();
        this.carName = voiture != null ? voiture.getCarName() : null;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }
}