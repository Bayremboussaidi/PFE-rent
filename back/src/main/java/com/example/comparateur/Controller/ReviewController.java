package com.example.comparateur.Controller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comparateur.DTO.ReviewDTO;
import com.example.comparateur.Entity.Review;
import com.example.comparateur.Service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:4200")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/{voitureId}")
    public ResponseEntity<Object> createReview(@PathVariable Long voitureId, @RequestBody Review review) {
        return reviewService.createReview(voitureId, review);
    }

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }


    @GetMapping("/username/{username}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUsername(@PathVariable String username) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUsername(username);
        return ResponseEntity.ok(reviews);
    }






        // Delete review by ID
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Object> deleteReview(@PathVariable Long reviewId) {
        boolean isDeleted = reviewService.deleteReview(reviewId);
        if (isDeleted) {
            return ResponseEntity.ok().body("Review deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("Review not found");
        }
    }

}
