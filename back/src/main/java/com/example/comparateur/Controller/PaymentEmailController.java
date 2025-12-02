package com.example.comparateur.Controller;

import com.example.comparateur.Service.EmailService;
import com.example.comparateur.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment-email")
@CrossOrigin(origins = "*")
public class PaymentEmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ReportService reportService;

    @PostMapping("/send-confirmation")
    public ResponseEntity<String> sendPaymentConfirmation(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String customerName = request.get("customerName");
            String carName = request.get("carName");
            String startDate = request.get("startDate");
            String endDate = request.get("endDate");
            String amount = request.get("amount");
            String transactionId = request.get("transactionId");
            String phone = request.get("phone");

            // Generate PDF
            byte[] pdfBytes = reportService.generatePaymentConfirmationPdf(
                customerName, email, carName, startDate, endDate, amount, transactionId, phone
            );

            // Send email with PDF
            emailService.sendEmailWithAttachment(
                email,
                " Payment Confirmation - MyLoc #" + transactionId,
                buildEmailContent(customerName, carName, startDate, endDate, amount, transactionId),
                pdfBytes
            );

            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed: " + e.getMessage());
        }
    }

    @PostMapping("/send-payment-link")
    public ResponseEntity<Map<String, String>> sendPaymentLink(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            String customerName = (String) request.get("customerName");
            String carName = (String) request.get("carName");
            String startDate = (String) request.get("startDate");
            String endDate = (String) request.get("endDate");
            Double amount = Double.valueOf(request.get("amount").toString());
            Long bookingId = Long.valueOf(request.get("bookingId").toString());
            String phone = (String) request.getOrDefault("phone", "");

            reportService.sendPaymentLinkEmail(email, customerName, carName, startDate, endDate, amount, bookingId, phone);

            String paymentLink = reportService.generatePaymentLink(bookingId, customerName, email, carName, startDate, endDate, amount, phone);

            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("paymentLink", paymentLink);
            response.put("message", "Payment link sent to " + email);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/generate-link")
    public ResponseEntity<Map<String, String>> generatePaymentLink(
            @RequestParam Long bookingId,
            @RequestParam String customerName,
            @RequestParam String customerEmail,
            @RequestParam String carName,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam Double amount,
            @RequestParam(required = false) String phone) {

        String paymentLink = reportService.generatePaymentLink(
            bookingId, customerName, customerEmail, carName, startDate, endDate, amount, phone
        );

        Map<String, String> response = new HashMap<>();
        response.put("paymentLink", paymentLink);
        return ResponseEntity.ok(response);
    }

    private String buildEmailContent(String customerName, String carName, String startDate,
                                      String endDate, String amount, String transactionId) {
        return "Dear " + customerName + ",\n\n" +
            "Your payment has been successfully processed!\n\n" +
            "Transaction ID: " + transactionId + "\n" +
            "Car: " + carName + "\n" +
            "Period: " + startDate + " - " + endDate + "\n" +
            "Amount: $" + amount + "\n\n" +
            "Please find your receipt attached.\n\n" +
            "Thank you for choosing MyLoc Car Rental!\n" +
            "Contact: myloclac2@gmail.com | +216 27 932 190";
    }
}