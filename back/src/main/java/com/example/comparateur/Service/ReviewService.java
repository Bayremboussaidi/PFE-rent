package com.example.comparateur.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.comparateur.DTO.ReviewDTO;
import com.example.comparateur.Entity.Review;
import com.example.comparateur.Entity.Voiture;
import com.example.comparateur.Repository.ReviewRepository;
import com.example.comparateur.Repository.VoitureRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private VoitureRepository voitureRepository;

    /*public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }*/



    public List<ReviewDTO> getReviewsByUsername(String username) {
        return reviewRepository.findAllByUsername(username).stream()
            .map(review -> new ReviewDTO(review, review.getVoiture()))
            .collect(Collectors.toList());
    }



    /*public List<Review> getReviewsByUsername(String username) {
        return reviewRepository.findAllByUsername(username);
    }*/


    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream()
            .map(review -> new ReviewDTO(review, review.getVoiture()))
            .collect(Collectors.toList());
    }

    public ResponseEntity<Object> createReview(Long voitureId, Review review) {
        try {
            Optional<Voiture> optionalVoiture = voitureRepository.findById(voitureId);
            if (optionalVoiture.isPresent()) {
                Voiture voiture = optionalVoiture.get();

                //  Link the review to the voiture before saving
                review.setVoiture(voiture);

                //  Save the review AFTER linking it to the voiture
                Review savedReview = reviewRepository.save(review);

                return ResponseEntity.ok().body(new ApiResponse(true, "Review submitted successfully", savedReview));
            } else {
                return ResponseEntity.status(404).body(new ApiResponse(false, "Voiture not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "Failed to submit review: " + e.getMessage()));
        }
    }

    // ApiResponse class to handle responses
    public static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public ApiResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        // Getters and setters
        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }












        // Method to delete review by ID
        public boolean deleteReview(Long reviewId) {
            Optional<Review> review = reviewRepository.findById(reviewId);
            if (review.isPresent()) {
                reviewRepository.deleteById(reviewId);
                return true;
            } else {
                return false;  // Return false if review does not exist
            }
        }
}
