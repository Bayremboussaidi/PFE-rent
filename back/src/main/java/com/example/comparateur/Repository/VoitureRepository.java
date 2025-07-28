/*package com.example.comparateur.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comparateur.Entity.Voiture;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    List<Voiture> findByFeatured(boolean featured);
    List<Voiture> findByLocalContainingIgnoreCase(String local);
}
    */

    package com.example.comparateur.Repository;

    import java.util.List;

    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import com.example.comparateur.Entity.Voiture;
    
    @Repository
    public interface VoitureRepository extends JpaRepository<Voiture, Long> {
        Page<Voiture> findAll(Pageable pageable);  //  Ensure pagination works
        List<Voiture> findByFeatured(boolean featured);
        List<Voiture> findByLocalContainingIgnoreCase(String local);


 
        boolean existsByMatricule(String matricule);


        //filter by agence 
        List<Voiture> findByAgence(String nom);
    }
    