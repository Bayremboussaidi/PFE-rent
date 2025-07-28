package com.example.comparateur.DTO.AGENCE;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class AgenceRequestDTO {
    @NotBlank
    private String agencyName;
    
    @Email
    private String email;
    
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")

    private String password;
    
    private String phoneNumber;
    private String city;
    private String photo;

    // Getters
    public String getAgencyName() { return agencyName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getCity() { return city; }
    public String getPhoto() { return photo; }

    // Setters
    public void setAgencyName(String agencyName) { this.agencyName = agencyName; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setCity(String city) { this.city = city; }
    public void setPhoto(String base64Photo) { this.photo = base64Photo; }
}