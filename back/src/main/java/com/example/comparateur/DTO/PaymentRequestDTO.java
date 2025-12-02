package com.example.comparateur.Dto;

import java.math.BigDecimal;

public class PaymentRequestDTO {
    private BigDecimal amount;
    private String currency;
    private String description;
    private String customerEmail;
    private Long bookingId;

    public PaymentRequestDTO() {}

    public PaymentRequestDTO(BigDecimal amount, String currency, String description, String customerEmail, Long bookingId) {
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.customerEmail = customerEmail;
        this.bookingId = bookingId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
}