/*package com.example.comparateur.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comparateur.Entity.Photo;
import com.example.comparateur.Entity.Voiture;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, UUID> {

    // ✅ Corrected: Find all photos linked to a specific `voiture_id`
    @Query("SELECT p FROM Photo p WHERE p.voiture.id = :voitureId")
    List<Photo> findAllByVoitureId(@Param("voitureId") Long voitureId);

    // ✅ Alternative: Use the `voiture` object directly
    List<Photo> findAllByVoiture(Voiture voiture);

    // ✅ Corrected: Delete all photos related to a specific `voiture_id`
    @Query("DELETE FROM Photo p WHERE p.voiture.id = :voitureId")
    void deleteByVoitureId(@Param("voitureId") Long voitureId);
}
*/







/*
package com.example.comparateur.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.comparateur.Entity.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT p FROM Photo p WHERE p.voiture.id = :voitureId")
    List<Photo> findAllByVoitureId(@Param("voitureId") Long voitureId);



    public default List<Photo> findByVoiture_Id(Long voitureId) {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'findByVoiture_Id'");
        }


    @Transactional
    @Modifying
    @Query("DELETE FROM Photo p WHERE p.voiture.id = :voitureId")
    void deleteByVoitureId(@Param("voitureId") Long voitureId);
}*/





package com.example.comparateur.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.comparateur.Entity.Photo;
import com.example.comparateur.Entity.Voiture;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT p FROM Photo p WHERE p.voiture.id = :voitureId")
    List<Photo> findAllByVoitureId(@Param("voitureId") Long voitureId);

    @Query("DELETE FROM Photo p WHERE p.voiture.id = :voitureId")
    void deleteByVoitureId(@Param("voitureId") Long voitureId);

    Optional<Voiture> findByVoiture_Id(Long id);
}
