package com.example.comparateur.DTO.AGENCE;

public class AgenceUpdateDTO {
    private String agencyName;
    private String email;
    private String newPassword;
    private String phoneNumber;
    private String city;
    private String photo;

    // Getters
    public String getAgencyName() { return agencyName; }
    public String getEmail() { return email; }
    public String getNewPassword() { return newPassword; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getCity() { return city; }
    public String getPhoto() { return photo; }

    // Setters
    public void setAgencyName(String agencyName) { this.agencyName = agencyName; }
    public void setEmail(String email) { this.email = email; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setCity(String city) { this.city = city; }
    public void setPhoto(String photo) { this.photo = photo; }
}