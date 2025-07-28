package com.example.comparateur.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comparateur.Entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    // ✅ Fetch all reviews for a specific Voiture
    List<Review> findAllByVoitureId(Long voitureId);



    List<Review> findAllByUsername(String username); 

    
}
