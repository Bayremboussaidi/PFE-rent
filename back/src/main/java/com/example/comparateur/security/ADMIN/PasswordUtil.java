package com.example.comparateur.security.ADMIN;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    // Instance of BCryptPasswordEncoder to encode passwords
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Method to hash the password using BCrypt
    public static String hashPassword(String plainPassword) {
        return encoder.encode(plainPassword); // Hashes the password
    }

    // Method to check if the provided password matches the encoded password
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword); // Checks if passwords match
    }
}
