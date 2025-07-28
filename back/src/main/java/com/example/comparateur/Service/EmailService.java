package com.example.comparateur.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.comparateur.DTO.EmailRequestDTO;
import com.example.comparateur.Repository.FollowerRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private FollowerRepository followerRepository;
    

    public void sendEmail(EmailRequestDTO emailRequest) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("bayremboussaidi187@gmail.com");
        message.setSubject("New Message from " + emailRequest.getName());
        message.setText("Email: " + emailRequest.getEmail() + "\n\nMessage:\n" + emailRequest.getMessage());
        mailSender.send(message);
    }



    public void informEmail(EmailRequestDTO emailRequest) {
        // Fetch all followers' emails from the database
        List<String> followerEmails = followerRepository.findAllEmails();

        try {
            // Iterate over each follower's email and send an email
            for (String email : followerEmails) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email); // Send email to each follower
                message.setSubject("New Message from " + emailRequest.getName());
                message.setText("Email: " + emailRequest.getEmail() + "\n\nMessage:\n" + emailRequest.getMessage());
                mailSender.send(message);
                System.out.println("Email sent to: " + email);
            }
        } catch (MailException e) {
            System.err.println("Email sending failed: " + e.getMessage());
            e.printStackTrace(); // For debugging
        }
    }



    public void sendEmailWithAttachment(String to, String subject, String text, byte[] attachment) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            if (attachment != null) {
                helper.addAttachment("booking-confirmation.pdf", new ByteArrayResource(attachment));
                System.out.println("Attachment added successfully, size: " + attachment.length);
            } else {
                System.out.println("Attachment is null");
            }
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }



    public void sendEmailtoadmin(EmailRequestDTO emailRequest) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("bayremboussaidi187@gmail.com");
        message.setSubject("New Message from " + emailRequest.getName());
        message.setText("Email: " + emailRequest.getEmail() + "\n\nMessage:\n" + emailRequest.getMessage());
        mailSender.send(message);
    }
}