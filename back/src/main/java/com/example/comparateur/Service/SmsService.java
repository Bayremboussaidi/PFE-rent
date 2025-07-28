package com.example.comparateur.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SmsService {

    private final JavaMailSender mailSender;
    
    private static final Map<String, String> CARRIER_GATEWAYS = Map.of(
        "att", "@txt.att.net",
        "verizon", "@vtext.com",
        "tmobile", "@tmomail.net",
        "sprint", "@messaging.sprintpcs.com"
    );

    public SmsService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSms(String phoneNumber, String carrierCode, String message) {
        try {
            String formattedNumber = formatPhoneNumber(phoneNumber);
            String gateway = CARRIER_GATEWAYS.getOrDefault(carrierCode.toLowerCase(), "");
            
            if(gateway.isEmpty()) {
                throw new IllegalArgumentException("Opérateur non supporté");
            }
    
            if(!formattedNumber.startsWith("+216") && carrierCode.equalsIgnoreCase("orange")) {
                throw new IllegalArgumentException("Numéro Tunisie doit commencer par +216");
            }
    
            String toAddress = formattedNumber + gateway;
            
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toAddress);
            email.setSubject("");
            email.setText(message);
            
            mailSender.send(email);
        } catch (Exception e) {
        }
    }
    
    private String formatPhoneNumber(String phoneNumber) {
        String cleaned = phoneNumber.replaceAll("[^+0-9]", "");
        
        if(!cleaned.startsWith("+")) {
            if(cleaned.startsWith("00216")) {
                cleaned = "+" + cleaned.substring(2);
            } else if(cleaned.startsWith("216")) {
                cleaned = "+" + cleaned;
            } else if(cleaned.startsWith("0")) {
                cleaned = "+216" + cleaned.substring(1);
            }
        }
        
        if(!cleaned.matches("^\\+216[0-9]{8}$")) {
            throw new IllegalArgumentException("Format numéro invalide");
        }
        
        return cleaned;
    }

}