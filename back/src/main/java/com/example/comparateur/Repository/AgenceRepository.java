package com.example.comparateur.Repository;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.comparateur.Entity.Agence;


/*
@Repository
public interface AgenceRepository extends JpaRepository<Agence, Long> {

}*/




public interface AgenceRepository extends JpaRepository<Agence, Long> {
    @Query("SELECT a FROM Agence a WHERE " +
        "LOWER(a.agencyName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
        "LOWER(a.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
        "LOWER(a.city) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Agence> search(@Param("query") String query, org.springframework.data.domain.Pageable pageable);


    boolean existsByAgencyName(String agencyName);
    Optional<Agence> findByAgencyName(String agencyName);


    boolean existsByEmail(String email);


    Optional<Agence> findByEmail(String email);
}