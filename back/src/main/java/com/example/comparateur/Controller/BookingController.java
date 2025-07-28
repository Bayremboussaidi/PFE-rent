package com.example.comparateur.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Utils.ApiResponse;
import com.example.comparateur.DTO.BookingStatusUpdateDTO;
import com.example.comparateur.Entity.Booking;
import com.example.comparateur.Entity.BookingStatus;
import com.example.comparateur.Repository.BookingRepository;
import com.example.comparateur.Service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ Create a Booking
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createBooking(@RequestBody Booking booking) {
        if (booking.getEndDate() == null) {
            return ResponseEntity.status(400).body(new ApiResponse(false, "Error: Booking must have an end date."));
        }
        return bookingService.createBooking(booking);
    }

    // ✅ Get One Booking
    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneBooking(@PathVariable Long id) {
        return bookingService.getOneBooking(id);
    }

    // ✅ Get All Bookings
    @GetMapping("/all")
    public ResponseEntity<Object> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ Get Bookings by Status (PENDING, CONFIRMED, CANCELED)
    @GetMapping("/status/{status}")
    public ResponseEntity<Object> getBookingsByStatus(@PathVariable String status) {
        try {
            BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
            List<Booking> bookings = bookingRepository.findByBookingStatus(bookingStatus);
            return ResponseEntity.ok(new ApiResponse(true, "Bookings fetched successfully", bookings));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(new ApiResponse(false, "Invalid status. Use: PENDING, CONFIRMED, CANCELED"));
        }
    }

    // ✅ Update Booking
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        System.out.println("Received request to update booking ID: " + id);
        return bookingService.updateBooking(id, updatedBooking);
    }




    // Update Booking Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Object> updateBookingStatus(@PathVariable Long id, @RequestBody BookingStatusUpdateDTO dto) {
        try {
            Booking booking = bookingRepository.findById(id).orElse(null);
            if (booking == null) {
                return ResponseEntity.status(404).body(new ApiResponse(false, "Booking not found"));
            }
    
            if (dto.getStatus() == null || dto.getStatus().isEmpty()) {
                return ResponseEntity.status(400).body(new ApiResponse(false, "Status cannot be empty"));
            }
    
            try {
                BookingStatus bookingStatus = BookingStatus.valueOf(dto.getStatus().toUpperCase());
                booking.setBookingStatus(bookingStatus);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(400).body(new ApiResponse(false, "Invalid status. Use: PENDING, CONFIRMED, CANCELED"));
            }
    
            bookingRepository.saveAndFlush(booking); // ✅ Force save transaction
    
            return ResponseEntity.ok(new ApiResponse(true, "Booking status updated successfully", booking));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ApiResponse(false, "Internal Server Error: " + e.getMessage()));
        }
    }
    




    // Get Car Availability
    @GetMapping("/{voitureId}/availability")
    public ResponseEntity<Object> getCarAvailability(@PathVariable String voitureId) {
        List<Booking> bookings = bookingRepository.findAllBookingsByVoitureId(voitureId);

        List<Map<String, String>> unavailableDates = new ArrayList<>();

        for (Booking booking : bookings) {
            if (booking.getStartDate() != null && booking.getEndDate() != null) {
                Map<String, String> dateRange = new HashMap<>();
                dateRange.put("startDate", booking.getStartDate().toString());
                dateRange.put("endDate", booking.getEndDate().toString());
                unavailableDates.add(dateRange);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("voitureId", voitureId);
        response.put("unavailableDates", unavailableDates);

        return ResponseEntity.ok(response);
    }




// Get bookings by user email
@GetMapping("/user/{email}")
public ResponseEntity<Object> getBookingsByUserEmail(@PathVariable String email) {
    List<Booking> bookings = bookingRepository.findByUserEmail(email);
    
    if (bookings.isEmpty()) {
        return ResponseEntity.status(404).body(new ApiResponse(false, "No bookings found for this email"));
    }
    
    return ResponseEntity.ok(new ApiResponse(true, "Bookings fetched successfully", bookings));
}




@GetMapping("/username/{username}")
public ResponseEntity<Object> getBookingsByUsername(@PathVariable String username) {
    List<Booking> bookings = bookingRepository.findByUsername(username);
    
    if (bookings.isEmpty()) {
        return ResponseEntity.status(404).body(new ApiResponse(false, "No bookings found for this email"));
    }
    
    return ResponseEntity.ok(new ApiResponse(true, "Bookings fetched successfully", bookings));
}





@DeleteMapping("/{id}")
public ResponseEntity<Object> deleteBooking(@PathVariable Long id) {
    try {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.status(404).body(new ApiResponse(false, "Booking not found"));
        }

        bookingRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Booking deleted successfully"));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ApiResponse(false, "Error deleting booking: " + e.getMessage()));
    }
}

}
