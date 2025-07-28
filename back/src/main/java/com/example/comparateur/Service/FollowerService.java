package com.example.comparateur.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comparateur.Entity.Follower;
import com.example.comparateur.Repository.FollowerRepository;

@Service
public class FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    public List<Follower> getAllFollowers() {
        return followerRepository.findAll();
    }

    public Follower addFollower(Follower follower) {
        Optional<Follower> existing = followerRepository.findByEmail(follower.getEmail());
    
        if (existing.isPresent()) {
            // Log to console instead of throwing
            System.out.println("Duplicate email attempt: " + follower.getEmail());
            return existing.get(); // Return existing entry
        }
        
        return followerRepository.save(follower);
    }

    public void deleteFollower(Long id) {
        followerRepository.deleteById(id);
    }
}