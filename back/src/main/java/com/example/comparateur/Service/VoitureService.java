    package com.example.comparateur.Service;

    import java.time.LocalDateTime;
    import java.util.Collections;
    import java.util.List;
    import java.util.Optional;
    import java.util.stream.Collectors;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;
    
    import com.example.comparateur.DTO.ApiResponse;
    import com.example.comparateur.DTO.PhotoResponseDTO;
    import com.example.comparateur.DTO.VoitureAdmin;
    import com.example.comparateur.DTO.VoitureResponse;
    import com.example.comparateur.Entity.Booking;
import com.example.comparateur.Entity.Photo;
import com.example.comparateur.Entity.Review;
import com.example.comparateur.Entity.Voiture;
import com.example.comparateur.Repository.BookingRepository;
    import com.example.comparateur.Repository.PhotoRepository;
    import com.example.comparateur.Repository.ReviewRepository;
import com.example.comparateur.Repository.VoitureRepository;
    
    @Service
    public class VoitureService {
    
        @Autowired
        private VoitureRepository voitureRepository;
    
        @Autowired
        private ReviewRepository reviewRepository;
    
        @Autowired
        private PhotoRepository photoRepository;

        @Autowired
        private BookingRepository bookingRepository; 
    
        //  Create a new voiture
        public ResponseEntity<ApiResponse<Voiture>> createVoiture(Voiture voiture) {
            try {
                // Check if the matricule already exists
                if (voitureRepository.existsByMatricule(voiture.getMatricule())) {
                    return ResponseEntity.status(400)
                            .body(new ApiResponse<>(false, "Matricule already exists", null));
                }
        
                // Initialize timestamps for the new voiture
                voiture.setCreatedAt(LocalDateTime.now());
                voiture.setUpdatedAt(LocalDateTime.now());
        
                // Save the voiture in the database
                Voiture savedVoiture = voitureRepository.save(voiture);
        
                // Return success response with the saved voiture
                return ResponseEntity.ok(new ApiResponse<>(true, "Successfully created", savedVoiture));
            } catch (Exception e) {
                // Log the exception for debugging (optional)
                e.printStackTrace();
        
                // Return error response
                return ResponseEntity.status(500)
                        .body(new ApiResponse<>(false, "Failed to create. Try again", null));
            }
        }
        
        

        


        /*    public ResponseEntity<Object> getOneVoiture(Long id) {
        Optional<Voiture> optionalVoiture = voitureRepository.findById(id);

        if (optionalVoiture.isPresent()) {
            Voiture voiture = optionalVoiture.get();
            List<Photo> photos = photoRepository.findAllByVoitureId(id);
            List<Review> reviews = reviewRepository.findAllByVoitureId(id);
            List<Booking> bookings = bookingRepository.findByVoitureId(id);

            return ResponseEntity.ok(new ApiResponse<>(true, "Voiture info", 
                new VoitureResponse(voiture, photos, reviews, bookings)
            ));
        } else {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "Not found"));
        }
    }
 */
    
        //  Update voiture (with optional image)
        public ResponseEntity<Object> updateVoiture(Long id, Voiture voiture, MultipartFile file) {
            Optional<Voiture> optionalVoiture = voitureRepository.findById(id);
            if (optionalVoiture.isEmpty()) {
                return ResponseEntity.status(404).body(new ApiResponse<>(false, "Voiture not found"));
            }
    
            Voiture existingVoiture = optionalVoiture.get();
            existingVoiture.setCarName(voiture.getCarName());
            existingVoiture.setBrand(voiture.getBrand());
            existingVoiture.setCategory(voiture.getCategory());
            existingVoiture.setPrice(voiture.getPrice());
            existingVoiture.setUpdatedAt(LocalDateTime.now());
    
            voitureRepository.save(existingVoiture);
            return ResponseEntity.ok(new ApiResponse<>(true, "Successfully updated", existingVoiture));
        }
    
        public ResponseEntity<Object> getAllVoitures() {
            List<Voiture> voitures = voitureRepository.findAll();  // Fetch all voitures without pagination
            
            if (voitures.isEmpty()) {
                return ResponseEntity.status(404).body(new ApiResponse<>(false, "No cars found"));
            }
            
            return ResponseEntity.ok(new ApiResponse<>(true, "List of voitures", voitures));
        }
        




    
        //  Get a single voiture by ID
    public ResponseEntity<Object> getOneVoiture(Long id) {
        Optional<Voiture> optionalVoiture = voitureRepository.findById(id);

        if (optionalVoiture.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "Voiture not found"));
        }

        Voiture voiture = optionalVoiture.get();
        List<Photo> photos = photoRepository.findAllByVoitureId(id);
        List<Review> reviews = reviewRepository.findAllByVoitureId(id);
        List<Booking> bookings = bookingRepository.findByVoitureId(id); // Fetch bookings

        // Convert photos to DTOs
        List<PhotoResponseDTO> photoDTOs = photos.stream()
                .map(PhotoResponseDTO::new)
                .collect(Collectors.toList());

        // Create response object
        VoitureAdmin voitureAdmin = new VoitureAdmin(
        voiture,
        photoDTOs,
        reviews,
        bookings,
        voiture.isDisponible()
        );

        return ResponseEntity.ok(new ApiResponse<>(true, "Voiture details retrieved", voitureAdmin));
    }





    
        //  Get total count of voitures (Fix for Angular)
        public ResponseEntity<Object> getVoitureCount() {
            long voitureCount = voitureRepository.count();
            return ResponseEntity.ok(new ApiResponse<>(true, "Total number of voitures", voitureCount));
        }









    
        //  Get all voitures with details (Fix for frontend request)
        public ResponseEntity<Object> getAllVoituresWithDetails() {
            List<Voiture> voitures = voitureRepository.findAll();
        
            if (voitures.isEmpty()) {
                return ResponseEntity.status(404).body(new ApiResponse<>(false, "No voitures found"));
            }
        
            List<VoitureResponse> voitureResponses = voitures.stream().map(voiture -> {
                // Fetch reviews safely
                List<Review> reviews = reviewRepository.findAllByVoitureId(voiture.getId());
                reviews = (reviews != null) ? reviews : Collections.emptyList(); // Prevent null issues
        
                // Fetch photos safely and convert to DTO
                List<Photo> photosList = photoRepository.findAllByVoitureId(voiture.getId()); // ✅ Corrected method name
                List<PhotoResponseDTO> photos = (photosList != null)
                        ? photosList.stream().map(PhotoResponseDTO::new).collect(Collectors.toList())
                        : Collections.emptyList(); // Prevent null issues
        
                return new VoitureResponse(voiture, photos, reviews);
            }).collect(Collectors.toList());
        
            return ResponseEntity.ok(new ApiResponse<>(true, "List of voitures with details", voitureResponses));
        }




        public ResponseEntity<Object> getVoituresByAgenceWithDetails(String agenceName) {
            //  Fetch voitures by agence NAME
            List<Voiture> voitures = voitureRepository.findByAgence(agenceName);
        
            if (voitures.isEmpty()) {
                return ResponseEntity.status(404)
                    .body(new ApiResponse<>(false, "No voitures found for agence: " + agenceName));
            }
        
            //  Same response building as getAllVoituresWithDetails()
            List<VoitureResponse> voitureResponses = voitures.stream().map(voiture -> {
                List<Review> reviews = reviewRepository.findAllByVoitureId(voiture.getId());
                reviews = (reviews != null) ? reviews : Collections.emptyList();
        
                List<Photo> photosList = photoRepository.findAllByVoitureId(voiture.getId());
                List<PhotoResponseDTO> photos = (photosList != null)
                        ? photosList.stream().map(PhotoResponseDTO::new).collect(Collectors.toList())
                        : Collections.emptyList();
        
                return new VoitureResponse(voiture, photos, reviews);
            }).collect(Collectors.toList());
        
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Voitures for agence: " + agenceName, voitureResponses)
            );
        }
        
        



        
    
        //  Delete voiture
        public ResponseEntity<Object> deleteVoiture(Long id) {
            if (!voitureRepository.existsById(id)) {
                return ResponseEntity.status(404).body(new ApiResponse<>(false, "Voiture not found"));
            }
    
            voitureRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Successfully deleted"));
        }
    
        //  Get reviews for a voiture
        public ResponseEntity<Object> getReviewsForVoiture(Long voitureId) {
            List<Review> reviews = reviewRepository.findAllByVoitureId(voitureId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Reviews retrieved successfully", reviews));
        }
    
        //  Get all photos for a voiture
        public List<PhotoResponseDTO> getPhotosByVoitureId(Long voitureId) {
            List<Photo> photosList = photoRepository.findAllByVoitureId(voitureId);
        
            //  Handle null values safely
            if (photosList == null || photosList.isEmpty()) {
                return Collections.emptyList();
            }
        
            return photosList.stream()
                    .map(PhotoResponseDTO::new)
                    .collect(Collectors.toList());
        }
        
    }
    
