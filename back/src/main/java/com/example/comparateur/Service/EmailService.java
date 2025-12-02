package com.example.comparateur.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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

    @Autowired
    @Lazy
    private ReportService reportService;

    // ==================== EXISTING METHODS ====================

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

    // ==================== PAYMENT EMAIL METHODS ====================

    /**
     * Send HTML email (generic)
     */
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            System.out.println("HTML email sent to: " + to);
        } catch (MessagingException e) {
            System.err.println("Failed to send HTML email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Send payment confirmation email with PDF attachment
     */
    public void sendPaymentConfirmationEmail(String to, String customerName, String carName,
                                              String startDate, String endDate, String amount,
                                              String transactionId, String phone) {
        try {
            // Generate PDF from ReportService
            byte[] pdfBytes = reportService.generatePaymentConfirmationPdf(
                customerName, to, carName, startDate, endDate, amount, transactionId, phone
            );

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setSubject("🚗 Payment Confirmation - MyLoc #" + transactionId);
            helper.setText(buildPaymentEmailHtml(customerName, to, carName, startDate, endDate, amount, transactionId, phone), true);
            
            // Attach PDF
            if (pdfBytes != null && pdfBytes.length > 0) {
                helper.addAttachment("MyLoc_Payment_Receipt_" + transactionId + ".pdf", new ByteArrayResource(pdfBytes));
                System.out.println("PDF attachment added, size: " + pdfBytes.length);
            }
            
            mailSender.send(message);
            System.out.println("Payment confirmation email with PDF sent to: " + to);
            
        } catch (MessagingException e) {
            System.err.println("Failed to send payment email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Send payment link email to customer
     */
    public void sendPaymentLinkEmail(String to, String customerName, String carName,
                                      String startDate, String endDate, Double amount,
                                      String paymentLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setSubject("💳 Complete Your Payment - MyLoc Car Rental");
            helper.setText(buildPaymentLinkEmailHtml(customerName, carName, startDate, endDate, amount, paymentLink), true);
            
            mailSender.send(message);
            System.out.println("Payment link email sent to: " + to);
            
        } catch (MessagingException e) {
            System.err.println("Failed to send payment link email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ==================== HTML BUILDERS ====================

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
                    <div style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 40px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🚗 MyLoc Car Rental</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 16px;">Your Trusted Car Rental Partner</p>
                    </div>
                    
                    <!-- Success Badge -->
                    <div style="text-align: center; padding: 35px 20px 15px 20px;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%%, #059669 100%%); color: white; padding: 15px 40px; border-radius: 30px; font-size: 20px; font-weight: bold; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                            ✓ PAYMENT SUCCESSFUL
                        </div>
                    </div>
                    
                    <!-- Greeting -->
                    <div style="padding: 25px 40px;">
                        <p style="font-size: 17px; color: #333;">Dear <strong>%s</strong>,</p>
                        <p style="font-size: 15px; color: #555; line-height: 1.7;">
                            Thank you for your payment! Your car rental booking has been confirmed. 
                            Please find your PDF receipt attached to this email.
                        </p>
                    </div>
                    
                    <!-- Invoice Box -->
                    <div style="margin: 0 40px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                        <div style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 20px 25px;">
                            <h2 style="color: white; margin: 0; font-size: 22px;">📋 BOOKING CONFIRMATION</h2>
                        </div>
                        <table style="width: 100%%; border-collapse: collapse; background: #fff;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; width: 40%%; background-color: #f8f9ff;">Transaction ID</td>
                                <td style="padding: 18px 25px; color: #333; font-family: 'Courier New', monospace; font-size: 13px; font-weight: 600;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">Customer Name</td>
                                <td style="padding: 18px 25px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">Email</td>
                                <td style="padding: 18px 25px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">Phone</td>
                                <td style="padding: 18px 25px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">🚗 Car</td>
                                <td style="padding: 18px 25px; color: #333; font-weight: bold; font-size: 16px;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">📅 Pick-up Date</td>
                                <td style="padding: 18px 25px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">📅 Return Date</td>
                                <td style="padding: 18px 25px; color: #333;">%s</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 18px 25px; font-weight: 600; color: #555; background-color: #f8f9ff;">Status</td>
                                <td style="padding: 18px 25px;">
                                    <span style="background: linear-gradient(135deg, #10b981 0%%, #059669 100%%); color: white; padding: 6px 18px; border-radius: 20px; font-size: 12px; font-weight: bold;">✓ PAID</span>
                                </td>
                            </tr>
                            <tr style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);">
                                <td style="padding: 25px; font-weight: bold; color: white; font-size: 18px;">💰 Total Amount</td>
                                <td style="padding: 25px; color: white; font-size: 28px; font-weight: bold;">$%s</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- PDF Notice -->
                    <div style="margin: 25px 40px; padding: 20px; background: linear-gradient(135deg, #e0f2fe 0%%, #bae6fd 100%%); border-radius: 12px; text-align: center;">
                        <p style="margin: 0; color: #0369a1; font-size: 14px; font-weight: 600;">
                            📎 Your PDF receipt is attached to this email. Please save it for your records.
                        </p>
                    </div>
                    
                    <!-- Important Notes -->
                    <div style="margin: 25px 40px; padding: 25px; background-color: #fffbeb; border-left: 5px solid #f59e0b; border-radius: 0 12px 12px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 17px;">⚠️ Important Information</h3>
                        <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 14px; line-height: 2;">
                            <li>Please bring a valid driver's license and this confirmation email.</li>
                            <li>Arrive 15 minutes before your scheduled pickup time.</li>
                            <li>A security deposit may be required at pickup.</li>
                            <li>For any changes, contact us at least 24 hours in advance.</li>
                        </ul>
                    </div>
                    
                    <!-- Contact Section -->
                    <div style="margin: 0 40px 30px 40px; padding: 25px; background: linear-gradient(135deg, #f8fafc 0%%, #f1f5f9 100%%); border-radius: 16px; text-align: center;">
                        <h3 style="margin: 0 0 20px 0; color: #334155; font-size: 18px;">📞 Need Help?</h3>
                        <p style="margin: 8px 0; color: #64748b; font-size: 15px;">📧 <strong>myloclac2@gmail.com</strong></p>
                        <p style="margin: 8px 0; color: #64748b; font-size: 15px;">📱 <strong>+216 27 932 190</strong></p>
                        <p style="margin: 8px 0; color: #64748b; font-size: 15px;">📍 <strong>Les Berges du Lac 2, Tunis, Tunisia</strong></p>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: linear-gradient(135deg, #1e293b 0%%, #0f172a 100%%); padding: 30px; text-align: center;">
                        <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">Thank you for choosing MyLoc Car Rental! 🚗</p>
                        <p style="color: #94a3b8; margin: 0; font-size: 13px;">© 2025 MyLoc Car Rental. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, transactionId, customerName, email, 
                         phone != null && !phone.isEmpty() ? phone : "N/A", carName, startDate, endDate, amount);
    }

    private String buildPaymentLinkEmailHtml(String customerName, String carName, String startDate,
                                              String endDate, Double amount, String paymentLink) {
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
                    <div style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 40px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🚗 MyLoc Car Rental</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 16px;">Complete Your Payment</p>
                    </div>
                    
                    <!-- Greeting -->
                    <div style="padding: 35px 40px 25px;">
                        <p style="font-size: 17px; color: #333;">Dear <strong>%s</strong>,</p>
                        <p style="font-size: 15px; color: #555; line-height: 1.7;">
                            Your booking is almost complete! Please click the button below to securely pay for your car rental reservation.
                        </p>
                    </div>
                    
                    <!-- Booking Summary -->
                    <div style="margin: 0 40px; padding: 25px; background: linear-gradient(135deg, #f8f9ff 0%%, #eef2ff 100%%); border-radius: 16px; border: 1px solid #e0e7ff;">
                        <h3 style="margin: 0 0 20px 0; color: #6366f1; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">📋 Booking Summary</h3>
                        <table style="width: 100%%;">
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">🚗 Car:</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">📅 Pick-up:</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #64748b;">📅 Return:</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">%s</td>
                            </tr>
                            <tr style="border-top: 2px solid #6366f1;">
                                <td style="padding: 20px 0 10px; color: #1e293b; font-weight: 700; font-size: 18px;">💰 Total:</td>
                                <td style="padding: 20px 0 10px; color: #6366f1; font-weight: 800; font-size: 28px; text-align: right;">$%d</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Pay Button -->
                    <div style="text-align: center; padding: 40px;">
                        <a href="%s" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%%, #8b5cf6 100%%); color: white; padding: 20px 50px; text-decoration: none; border-radius: 14px; font-weight: bold; font-size: 18px; box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4); transition: transform 0.2s;">
                            💳 Pay Now Securely
                        </a>
                        <p style="margin: 20px 0 0; color: #94a3b8; font-size: 13px;">🔒 Secure payment powered by Stripe</p>
                    </div>
                    
                    <!-- Expiry Notice -->
                    <div style="margin: 0 40px 30px; padding: 15px; background-color: #fef2f2; border-radius: 10px; text-align: center;">
                        <p style="margin: 0; color: #dc2626; font-size: 13px; font-weight: 600;">
                            ⏰ This payment link will expire in 24 hours.
                        </p>
                    </div>
                    
                    <!-- Contact Section -->
                    <div style="margin: 0 40px 30px; padding: 25px; background: #f8fafc; border-radius: 16px; text-align: center;">
                        <h3 style="margin: 0 0 15px 0; color: #334155; font-size: 16px;">Questions?</h3>
                        <p style="margin: 5px 0; color: #64748b; font-size: 14px;">📧 myloclac2@gmail.com | 📱 +216 27 932 190</p>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: linear-gradient(135deg, #1e293b 0%%, #0f172a 100%%); padding: 30px; text-align: center;">
                        <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Thank you for choosing MyLoc! 🚗</p>
                        <p style="color: #94a3b8; margin: 0; font-size: 12px;">© 2025 MyLoc Car Rental. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(customerName, carName, startDate, endDate, amount.intValue(), paymentLink);
    }
}