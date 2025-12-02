package com.alibou.payment.service;



import com.alibou.payment.dto.PaymentRequestDTO;
import com.alibou.payment.dto.PaymentResponseDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripePaymentService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BACKEND_URL = "http://localhost:8080";

    public PaymentResponseDTO createPaymentIntent(PaymentRequestDTO request) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(request.getAmount() * 100)
                    .setCurrency(request.getCurrency() != null ? request.getCurrency() : "usd")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .putMetadata("customerEmail", nullSafe(request.getCustomerEmail()))
                    .putMetadata("customerName", nullSafe(request.getCustomerName()))
                    .putMetadata("bookingId", String.valueOf(request.getBookingId()))
                    .putMetadata("carName", nullSafe(request.getCarName()))
                    .putMetadata("startDate", nullSafe(request.getStartDate()))
                    .putMetadata("endDate", nullSafe(request.getEndDate()))
                    .putMetadata("phone", nullSafe(request.getPhone()))
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            System.out.println("Payment Intent created: " + paymentIntent.getId());

            return new PaymentResponseDTO(
                    paymentIntent.getClientSecret(),
                    paymentIntent.getId(),
                    "created",
                    "Payment intent created successfully"
            );
        } catch (StripeException e) {
            System.err.println("Stripe error: " + e.getMessage());
            return new PaymentResponseDTO(null, null, "error", e.getMessage());
        }
    }

    public PaymentResponseDTO confirmPayment(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            System.out.println("Payment status: " + paymentIntent.getStatus());

            if ("succeeded".equals(paymentIntent.getStatus())) {
                Map<String, String> metadata = paymentIntent.getMetadata();
                Long amount = paymentIntent.getAmount() / 100;

                // Call existing backend email service
                sendEmailViaBackend(
                        metadata.get("customerEmail"),
                        metadata.get("customerName"),
                        metadata.get("carName"),
                        metadata.get("startDate"),
                        metadata.get("endDate"),
                        amount.toString(),
                        paymentIntentId,
                        metadata.get("phone")
                );

                return new PaymentResponseDTO(null, paymentIntentId, "succeeded", "Payment confirmed and email sent");
            }
            return new PaymentResponseDTO(null, paymentIntentId, paymentIntent.getStatus(), "Payment status: " + paymentIntent.getStatus());
        } catch (StripeException e) {
            return new PaymentResponseDTO(null, null, "error", e.getMessage());
        }
    }

    private void sendEmailViaBackend(String email, String customerName, String carName,
                                      String startDate, String endDate, String amount,
                                      String transactionId, String phone) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new HashMap<>();
            body.put("email", email);
            body.put("customerName", customerName);
            body.put("carName", carName);
            body.put("startDate", startDate);
            body.put("endDate", endDate);
            body.put("amount", amount);
            body.put("transactionId", transactionId);
            body.put("phone", phone);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
            restTemplate.postForObject(BACKEND_URL + "/api/payment-email/send-confirmation", request, String.class);
            System.out.println("Email sent via backend to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    private String nullSafe(String value) {
        return value != null ? value : "";
    }
}