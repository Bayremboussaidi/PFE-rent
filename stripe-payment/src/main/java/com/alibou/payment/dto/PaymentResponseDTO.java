package com.alibou.payment.dto;

public class PaymentResponseDTO {
    private String clientSecret;
    private String paymentIntentId;
    private String status;
    private String message;

    // No-args constructor
    public PaymentResponseDTO() {
    }

    // All-args constructor
    public PaymentResponseDTO(String clientSecret, String paymentIntentId, String status, String message) {
        this.clientSecret = clientSecret;
        this.paymentIntentId = paymentIntentId;
        this.status = status;
        this.message = message;
    }

    // Getters
    public String getClientSecret() {
        return clientSecret;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    // Setters
    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}