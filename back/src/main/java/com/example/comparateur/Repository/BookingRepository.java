package com.example.comparateur.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comparateur.Entity.Booking;
import com.example.comparateur.Entity.BookingStatus;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByVoitureId(Long id);

    @Query("SELECT b FROM Booking b WHERE b.voitureId = :voitureId")
    List<Booking> findAllBookingsByVoitureId(@Param("voitureId") String voitureId);

    // Corrected method name to match the entity field
    List<Booking> findByBookingStatus(BookingStatus bookingStatus);

//used in the delete
    boolean existsById(Long id);


    
// Fetch bookings by user email
    List<Booking> findByUserEmail(String userEmail);


public List<Booking> findByUsername(String username);

}
