package com.example.comparateur.Service.USER;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Utils.ApiResponse;
import com.example.comparateur.DTO.UserUpdateDTO;
import com.example.comparateur.Entity.Role;
import com.example.comparateur.Entity.User;
import com.example.comparateur.Repository.UserRepository;


@Service
@Transactional
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CREATE USER
    public ResponseEntity<Object> createUser(User user) {
        try {
            // Validate mandatory fields
            if (user.getEmail() == null || user.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Email is required")
                );
            }
            
            if (user.getPassword() == null || user.getPassword().isBlank()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Password is required")
                );
            }

            // Check for existing email
            if (userRepository.existsByEmailIgnoreCase(user.getEmail())) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Email already registered")
                );
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            logger.info("Encoded password for {}", user.getEmail());

            // Set default role
            if (user.getRole() == null) {
                user.setRole(Role.USER);
            }

            // Save user
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok().body(
                new ApiResponse(true, "User created successfully", savedUser)
            );

        } catch (DataIntegrityViolationException e) {
            logger.error("Database error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                new ApiResponse(false, "Database constraint violation")
            );
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(
                new ApiResponse(false, "Internal server error")
            );
        }
    }





    // UPDATE USER
    public ResponseEntity<ApiResponse> updateUser(Long id, UserUpdateDTO dto) {
        return userRepository.findById(id)
            .map(existingUser -> {
                // Update only allowed fields
                existingUser.setUsername(dto.getUsername());
                existingUser.setEmail(dto.getEmail());
                existingUser.setPhone(dto.getPhone());
                existingUser.setRole(Role.valueOf(dto.getRole()));
                existingUser.setWorkplace(dto.getWorkplace());
                existingUser.setPhoto(dto.getPhoto());
                
                User updatedUser = userRepository.save(existingUser);
                return ResponseEntity.ok(new ApiResponse(true, "User updated", updatedUser));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }






    // DELETE USER
    public ResponseEntity<Object> deleteUser(Long id) {
        try {
            if (!userRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse(false, "User not found")
                );
            }
            
            userRepository.deleteById(id);
            return ResponseEntity.ok().body(
                new ApiResponse(true, "User deleted successfully")
            );

        } catch (Exception e) {
            logger.error("Delete error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(
                new ApiResponse(false, "Failed to delete user")
            );
        }
    }

    // GET USER BY ID
    public ResponseEntity<ApiResponse> getOneUser(Long id) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            
            return userOptional.map(user ->
                ResponseEntity.ok().body(new ApiResponse(true, "User found", user))
            ).orElseGet(() ->
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse(false, "User not found")
                )
            );

        } catch (Exception e) {
            logger.error("Retrieval error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(
                new ApiResponse(false, "Failed to retrieve user")
            );
        }
    }

    // GET ALL USERS
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok().body(
                new ApiResponse(true, "Users retrieved successfully", users)
            );
            
        } catch (Exception e) {
            logger.error("Retrieval error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(
                new ApiResponse(false, "Failed to retrieve users")
            );
        }
    }
}