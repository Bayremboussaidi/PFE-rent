package com.example.comparateur.DTO.blog;

public class CommentRequest {
    private String fullName;
    private String email;
    private String content;

    // Constructor
    public CommentRequest(String fullName, String email, String content) {
        this.fullName = fullName;
        this.email = email;
        this.content = content;
    }

    // Getter and Setter for fullName
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
