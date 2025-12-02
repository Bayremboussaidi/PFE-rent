package com.example.comparateur.Controller;


import com.example.comparateur.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment-email")
@CrossOrigin(origins = "*")
public class PaymentEmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-confirmation")
    public ResponseEntity<String> sendPaymentConfirmation(@RequestBody Map<String, String> request) {
        try {
            emailService.sendPaymentConfirmationEmail(
                request.get("email"),
                request.get("customerName"),
                request.get("carName"),
                request.get("startDate"),
                request.get("endDate"),
                request.get("amount"),
                request.get("transactionId"),
                request.get("phone")
            );
            return ResponseEntity.ok("Payment confirmation email sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed: " + e.getMessage());
        }
    }
}