package com.example.comparateur.DTO;


public class PaymentResponseDTO {
    private String sessionId;
    private String sessionUrl;
    private String status;
    private String message;

    public PaymentResponseDTO() {}

    public PaymentResponseDTO(String sessionId, String sessionUrl, String status, String message) {
        this.sessionId = sessionId;
        this.sessionUrl = sessionUrl;
        this.status = status;
        this.message = message;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionUrl() {
        return sessionUrl;
    }

    public void setSessionUrl(String sessionUrl) {
        this.sessionUrl = sessionUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
