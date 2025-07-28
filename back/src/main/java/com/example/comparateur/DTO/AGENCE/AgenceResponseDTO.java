package com.example.comparateur.DTO.AGENCE;

public class AgenceResponseDTO {
    private Long id;
    private String agencyName;
    private String email;
    private String phoneNumber;
    private String city;
    private String photo;

    // Constructor
    public AgenceResponseDTO(Long id, String agencyName, String email, 
                            String phoneNumber, String city, String photo) {
        this.id = id;
        this.agencyName = agencyName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.photo = photo;
    }

    // Getters
    public Long getId() { return id; }
    public String getAgencyName() { return agencyName; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getCity() { return city; }
    public String getPhoto() { return photo; }

    // Setters (optional, depends on your needs)
    public void setId(Long id) { this.id = id; }
    public void setAgencyName(String agencyName) { this.agencyName = agencyName; }
    public void setEmail(String email) { this.email = email; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setCity(String city) { this.city = city; }
    public void setPhoto(String photo) { this.photo = photo; }
}