package com.example.comparateur.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.comparateur.DTO.EmailRequestDTO;
import com.example.comparateur.Service.EmailService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody EmailRequestDTO emailRequest) {
        emailService.sendEmail(emailRequest);
        return "Email sent successfully";
    }



    @PostMapping("/sendEmail/toadmin")
    public String toadminEmail(@RequestBody EmailRequestDTO emailRequest) {
        emailService.sendEmailtoadmin(emailRequest);
        return "Email sent to admin successfully";
    }



    @PostMapping("/sendEmail/inform")
    public String informEmail(@RequestBody EmailRequestDTO emailRequest) {
        emailService.informEmail(emailRequest);  // This will send the email to all followers
        return "Emails sent successfully to all followers";
    }

    
}