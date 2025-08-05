/*
package com.example.comparateur;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.comparateur.entities.User;
import com.example.comparateur.repositories.UserRepository;
import com.example.comparateur.services.UserService;

@SpringBootTest(classes = BackApplication.class)
class UserServiceTest {
 
    @Mock
    private UserRepository userRepository;
 
    @InjectMocks
    private UserService userService;
 
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
 
    @Test
    void testUserCreation() {
        // Given
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");
 
        when(userRepository.save(any(User.class))).thenReturn(user);
 
        // When
        User savedUser = userService.createUser(user);
 
        // Then
        assertNotNull(savedUser);
        assertEquals("test@example.com", savedUser.getEmail());
        verify(userRepository, times(1)).save(user);
    }
 
    @Test
    void testUserValidation() {
       
        User user = new User();
        user.setEmail("invalid-email");
 
       
        assertThrows(IllegalArgumentException.class, () -> {
            userService.validateUser(user);
        });
    }
 
    @Test
    void testUserExists() {
        
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(new User());
 
        // When
        boolean exists = userService.userExists(email);
 
        assertTrue(exists);
        verify(userRepository, times(1)).findByEmail(email);
    }
}

*/