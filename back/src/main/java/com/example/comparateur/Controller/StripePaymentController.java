package com.example.comparateur.Controller;


/* 
import com.example.comparateur.dto.PaymentRequestDTO;
import com.example.comparateur.dto.PaymentResponseDTO;
import com.example.comparateur.service.StripePaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class StripePaymentController {

    @Autowired
    private StripePaymentService stripePaymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<PaymentResponseDTO> createCheckoutSession(@RequestBody PaymentRequestDTO request) {
        PaymentResponseDTO response = stripePaymentService.createCheckoutSession(request);
        
        if ("error".equals(response.getStatus())) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/session-status/{sessionId}")
    public ResponseEntity<PaymentResponseDTO> getSessionStatus(@PathVariable String sessionId) {
        PaymentResponseDTO response = stripePaymentService.getSessionStatus(sessionId);
        
        if ("error".equals(response.getStatus())) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public-key")
    public ResponseEntity<Map<String, String>> getPublicKey() {
        Map<String, String> response = new HashMap<>();
        response.put("publicKey", stripePaymentService.getPublicKey());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "stripe-payment");
        return ResponseEntity.ok(response);
    }
}*/