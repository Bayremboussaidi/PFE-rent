package com.example.comparateur.DTO;

import java.util.List;

import com.example.comparateur.Entity.Booking;
import com.example.comparateur.Entity.Review;
import com.example.comparateur.Entity.Voiture;

public class VoitureAdmin {
    

    private Voiture voiture;
    private List<PhotoResponseDTO> photos;
    private List<Review> reviews;
    private List<Booking> bookings;
    private boolean available;

    // Constructor
    public VoitureAdmin(Voiture voiture, List<PhotoResponseDTO> photos, List<Review> reviews, List<Booking> bookings, boolean available) {
        this.voiture = voiture;
        this.photos = photos;
        this.reviews = reviews;
        this.bookings = bookings;
        this.available = available;
    }

    public Voiture getVoiture() {
        return voiture;
    }

    public void setVoiture(Voiture voiture) {
        this.voiture = voiture;
    }

    public List<PhotoResponseDTO> getPhotos() {
        return photos;
    }

    public void setPhotos(List<PhotoResponseDTO> photos) {
        this.photos = photos;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}