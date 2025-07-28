package com.example.comparateur.DTO.admin;


public class AdminLoginResponse {

    private String message;
    private String username;
    private String email;
    private Long phone;
    private String workplace;
    private String role; // 👈 single role as String

    public AdminLoginResponse() {
    }

    public AdminLoginResponse(String message, String username, String email, Long phone, String workplace, String role) {
        this.message = message;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.workplace = workplace;
        this.role = role;
    }

    // Getters and Setters

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getWorkplace() {
        return workplace;
    }

    public void setWorkplace(String workplace) {
        this.workplace = workplace;
    }

    public String getRoles() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

