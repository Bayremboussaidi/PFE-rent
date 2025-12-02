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
        List<String> followerEmails = followerRepository.findAllEmails();

        try {
            for (String email : followerEmails) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject("New Message from " + emailRequest.getName());
                message.setText("Email: " + emailRequest.getEmail() + "\n\nMessage:\n" + emailRequest.getMessage());
                mailSender.send(message);
                System.out.println("Email sent to: " + email);
            }
        } catch (MailException e) {
            System.err.println("Email sending failed: " + e.getMessage());
            e.printStackTrace();
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

    // NEW: Send payment confirmation HTML email
    public void sendPaymentConfirmationEmail(String to, String customerName, String carName,
                                              String startDate, String endDate, String amount,
                                              String transactionId, String phone) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setSubject("Payment Confirmation - MyLoc Car Rental #" + transactionId);
            helper.setText(buildPaymentEmailHtml(customerName, to, carName, startDate, endDate, amount, transactionId, phone), true);
            
            mailSender.send(message);
            System.out.println("Payment confirmation email sent to: " + to);
            
        } catch (MessagingException e) {
            System.err.println("Failed to send payment email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private String buildPaymentEmailHtml(String customerName, String email, String carName,
                                          String startDate, String endDate, String amount,
                                          String transactionId, String phone) {
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #007bff 0%%, #0056b3 100%%); padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">MyLoc Car Rental</h1>
                        <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 14px;">Your Trusted Car Rental Partner</p>
                    </div>
                    
                    <!-- Success Badge -->
                    <div style="text-align: center; padding: 30px 20px 10px 20px;">
                        <div style="display: inline-block; background-color: #28a745; color: white; padding: 10px 30px; border-radius: 25px; font-size: 18px; font-weight: bold;">
                            PAYMENT SUCCESSFUL
                        </div>
                    </div>
                    
                    <!-- Greeting -->
                    <div style="padding: 20px 40px;">
                        <p style="font-size: 16px; color: #333;">Dear <strong>%s</strong>,</p>
                        <p style="font-size: 15px; color: #555; line-height: 1.6;">
                            Thank you for your payment! Your car rental booking has been confirmed.
                        </p>
                    </div>
                    
                    <!-- Invoice Box -->
                    <div style="margin: 0 40px; border: 2px solid #007bff; border-radius: 10px; overflow: hidden;">
                        <div style="background-color: #007bff; padding: 15px 20px;">
                            <h2 style="color: white; margin: 0; font-size: 20px;">BOOKING CONFIRMATION</h2>
                        </div>
                        <table style="width: 100%%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; width: 40%%; background-color: #f9f9f9;">Transaction ID</td>
                                <td style="padding: 15px 20px; color: #333; font-family: monospace; font-size: 13px;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">Customer Name</td>
                                <td style="padding: 15px 20px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">Email</td>
                                <td style="padding: 15px 20px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">Phone</td>
                                <td style="padding: 15px 20px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">Car</td>
                                <td style="padding: 15px 20px; color: #333; font-weight: bold;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">Start Date</td>
                                <td style="padding: 15px 20px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">End Date</td>
                                <td style="padding: 15px 20px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 15px 20px; font-weight: bold; color: #555; background-color: #f9f9f9;">Payment Status</td>
                                <td style="padding: 15px 20px;">
                                    <span style="background-color: #28a745; color: white; padding: 5px 15px; border-radius: 15px; font-size: 12px; font-weight: bold;">PAID</span>
                                </td>
                            </tr>
                            <tr style="background-color: #007bff;">
                                <td style="padding: 20px; font-weight: bold; color: white; font-size: 18px;">Total Amount</td>
                                <td style="padding: 20px; color: white; font-size: 24px; font-weight: bold;">$%s</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Important Notes -->
                    <div style="margin: 30px 40px; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
                        <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px;">Important Information</h3>
                        <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.8;">
                            <li>Please bring a valid driver's license and this confirmation email.</li>
                            <li>Arrive 15 minutes before your scheduled pickup time.</li>
                            <li>For any changes, contact us at least 24 hours in advance.</li>
                        </ul>
                    </div>
                    
                    <!-- Contact Section -->
                    <div style="margin: 0 40px 30px 40px; padding: 20px; background-color: #f8f9fa; border-radius: 10px; text-align: center;">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">Need Help?</h3>
                        <p style="margin: 5px 0; color: #555; font-size: 14px;"><strong>Email:</strong> myloclac2@gmail.com</p>
                        <p style="margin: 5px 0; color: #555; font-size: 14px;"><strong>Phone:</strong> +216 27 932 190</p>
                        <p style="margin: 5px 0; color: #555; font-size: 14px;"><strong>Address:</strong> Les Berges du Lac 2, Tunis, Tunisia</p>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #333; padding: 25px; text-align: center;">
                        <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Thank you for choosing MyLoc Car Rental!</p>
                        <p style="color: #aaa; margin: 0; font-size: 12px;">2025 MyLoc Car Rental. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, transactionId, customerName, email, 
                         phone != null ? phone : "N/A", carName, startDate, endDate, amount);
    }
}