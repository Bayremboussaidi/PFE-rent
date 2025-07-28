package com.example.comparateur.Controller;

import com.example.comparateur.DTO.SmsRequest;
import com.example.comparateur.Service.SmsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
public class SmsController {

    private final SmsService smsService;

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send")
    public String sendSms(@RequestBody SmsRequest smsRequest) {
        // Example carrier codes: "att", "verizon", "tmobile"
        if (!isValidRequest(smsRequest)) {
            return "Invalid request parameters";
        }
        
        try {
            smsService.sendSms(
                smsRequest.getTo(),
                smsRequest.getCarrierCode(),
                smsRequest.getMessage()
            );
            return "SMS sent successfully";
        } catch (Exception e) {
            return "SMS sending failed: " + e.getMessage();
        }
    }

    private boolean isValidRequest(SmsRequest request) {
        return request.getTo() != null 
            && !request.getTo().isEmpty()
            && request.getMessage() != null
            && !request.getMessage().isEmpty()
            && request.getCarrierCode() != null;
    }
}