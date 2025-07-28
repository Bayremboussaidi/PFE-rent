package com.example.comparateur.DTO.CHAT;


public class UserDTO {
    private String email;
    private String userName;

    public UserDTO(String email, String userName) {
        this.email = email;
        this.userName = userName;
    }

    // Getters
    public String getEmail() {
        return email;
    }

    public String getUserName() {
        return userName;
    }

    // Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
