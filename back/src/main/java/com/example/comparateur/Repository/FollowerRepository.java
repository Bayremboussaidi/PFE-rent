package com.example.comparateur.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.comparateur.Entity.Follower;

public interface FollowerRepository extends JpaRepository<Follower, Long> {

    

    Optional<Follower> findByEmail(String email);



    @Query("SELECT f.email FROM Follower f")
    List<String> findAllEmails();
}