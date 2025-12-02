package com.example.comparateur.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.comparateur.DTO.ReportRequest;
import com.example.comparateur.DTO.ReportResponse;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

import net.glxn.qrgen.javase.QRCode;

@Service
public class ReportService {

    @Autowired
    @Lazy
    private EmailService emailService;

    private final String FRONTEND_URL = "http://localhost:4200";

    // ==================== EXISTING BOOKING REPORT ====================
    
    public ReportResponse generateReport(ReportRequest reportRequest) {
        byte[] qrCodeImage = generateQRCode(reportRequest);
        byte[] pdfReport = generatePDFReport(reportRequest, qrCodeImage);

        emailService.sendEmailWithAttachment(reportRequest.getEmail(),
            "Your Booking Confirmation",
            "Please find your booking confirmation attached.",
            pdfReport);

        ReportResponse reportResponse = new ReportResponse();
        reportResponse.setQrCode(java.util.Base64.getEncoder().encodeToString(qrCodeImage));
        reportResponse.setPdfReport(pdfReport);

        return reportResponse;
    }

    // ==================== NEW: PAYMENT CONFIRMATION ====================

    /**
     * Generate Payment Confirmation PDF with QR Code
     */
    public byte[] generatePaymentConfirmationPdf(String customerName, String email, String carName,
                                                   String startDate, String endDate, String amount,
                                                   String transactionId, String phone) {
        try {
            Document document = new Document();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = PdfWriter.getInstance(document, baos);

            // Add header/footer with logo
            writer.setPageEvent(new PdfPageEventHelper() {
                public void onEndPage(PdfWriter writer, Document document) {
                    try {
                        // Date header
                        ColumnText.showTextAligned(
                            writer.getDirectContent(),
                            Element.ALIGN_RIGHT,
                            new Phrase(new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date())),
                            document.right() - 20,
                            document.top() + 15,
                            0
                        );

                        // Logo
                        try {
                            URL logoUrl = getClass().getResource("/static/images/logo2.png");
                            if (logoUrl != null) {
                                Image logo = Image.getInstance(logoUrl);
                                logo.scaleToFit(150, 150);
                                float xPosition = (document.right() - document.left() - logo.getScaledWidth()) / 2 + document.left();
                                logo.setAbsolutePosition(xPosition, document.bottom() - 50);
                                writer.getDirectContent().addImage(logo);
                            }
                        } catch (Exception e) {
                            System.err.println("Error loading logo: " + e.getMessage());
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });

            document.open();

            // Colors
            BaseColor primaryColor = new BaseColor(99, 102, 241);
            BaseColor successColor = new BaseColor(16, 185, 129);
            BaseColor grayColor = new BaseColor(107, 114, 128);

            // Fonts
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD, primaryColor);
            Font subtitleFont = new Font(Font.FontFamily.HELVETICA, 14, Font.NORMAL, grayColor);
            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font normalFont = new Font(Font.FontFamily.HELVETICA, 11, Font.NORMAL, grayColor);
            Font boldFont = new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD);
            Font successFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, successColor);
            Font amountFont = new Font(Font.FontFamily.HELVETICA, 22, Font.BOLD, primaryColor);

            // Title
            Paragraph title = new Paragraph("MyLoc Car Rental", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Paragraph subtitle = new Paragraph("Payment Confirmation", subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(25);
            document.add(subtitle);

            // Success Badge
            Paragraph success = new Paragraph("✓ PAYMENT SUCCESSFUL", successFont);
            success.setAlignment(Element.ALIGN_CENTER);
            success.setSpacingAfter(25);
            document.add(success);

            // Transaction Details Table
            PdfPTable detailsTable = new PdfPTable(2);
            detailsTable.setWidthPercentage(100);
            detailsTable.setSpacingBefore(10);
            detailsTable.setSpacingAfter(20);

            addTableRow(detailsTable, "Transaction ID", transactionId, headerFont, boldFont);
            addTableRow(detailsTable, "Date", new SimpleDateFormat("MMMM dd, yyyy HH:mm").format(new Date()), headerFont, normalFont);
            addTableRow(detailsTable, "Customer", customerName, headerFont, normalFont);
            addTableRow(detailsTable, "Email", email, headerFont, normalFont);
            addTableRow(detailsTable, "Phone", phone != null && !phone.isEmpty() ? phone : "N/A", headerFont, normalFont);

            document.add(detailsTable);

            // Booking Details Section
            Paragraph bookingTitle = new Paragraph("Booking Details", headerFont);
            bookingTitle.setSpacingBefore(15);
            bookingTitle.setSpacingAfter(10);
            document.add(bookingTitle);

            PdfPTable bookingTable = new PdfPTable(2);
            bookingTable.setWidthPercentage(100);
            bookingTable.setSpacingAfter(20);

            addTableRow(bookingTable, "Car", carName, headerFont, boldFont);
            addTableRow(bookingTable, "Pick-up Date", startDate, headerFont, normalFont);
            addTableRow(bookingTable, "Return Date", endDate, headerFont, normalFont);

            document.add(bookingTable);

            // Total Amount
            PdfPTable totalTable = new PdfPTable(2);
            totalTable.setWidthPercentage(100);
            totalTable.setSpacingBefore(10);

            PdfPCell labelCell = new PdfPCell(new Phrase("Total Amount Paid", headerFont));
            labelCell.setBorder(Rectangle.TOP);
            labelCell.setBorderColor(primaryColor);
            labelCell.setBorderWidth(2);
            labelCell.setPaddingTop(15);
            labelCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

            PdfPCell amountCell = new PdfPCell(new Phrase("$" + amount, amountFont));
            amountCell.setBorder(Rectangle.TOP);
            amountCell.setBorderColor(primaryColor);
            amountCell.setBorderWidth(2);
            amountCell.setPaddingTop(15);
            amountCell.setHorizontalAlignment(Element.ALIGN_RIGHT);

            totalTable.addCell(labelCell);
            totalTable.addCell(amountCell);
            document.add(totalTable);

            // QR Code with transaction info
            byte[] qrCodeBytes = generatePaymentQRCode(transactionId, customerName, carName, amount);
            if (qrCodeBytes != null && qrCodeBytes.length > 0) {
                Image qrImage = Image.getInstance(qrCodeBytes);
                qrImage.scaleToFit(120, 120);
                qrImage.setAlignment(Element.ALIGN_CENTER);
                qrImage.setSpacingBefore(20);
                document.add(qrImage);

                Paragraph qrLabel = new Paragraph("Scan for booking details", normalFont);
                qrLabel.setAlignment(Element.ALIGN_CENTER);
                qrLabel.setSpacingAfter(20);
                document.add(qrLabel);
            }

            // Important Notes
            Paragraph notesTitle = new Paragraph("Important Information", headerFont);
            notesTitle.setSpacingBefore(20);
            notesTitle.setSpacingAfter(10);
            document.add(notesTitle);

            com.itextpdf.text.List list = new com.itextpdf.text.List(com.itextpdf.text.List.UNORDERED);
            list.add(new com.itextpdf.text.ListItem("Please bring a valid driver's license", normalFont));
            list.add(new com.itextpdf.text.ListItem("Arrive 15 minutes before your scheduled pick-up time", normalFont));
            list.add(new com.itextpdf.text.ListItem("A security deposit may be required at pick-up", normalFont));
            list.add(new com.itextpdf.text.ListItem("Fuel policy: Return with the same fuel level", normalFont));
            document.add(list);

            // Footer
            Paragraph footer = new Paragraph();
            footer.setSpacingBefore(30);
            footer.add(new Chunk("Thank you for choosing MyLoc Car Rental!\n", boldFont));
            footer.add(new Chunk("Contact: myloclac2@gmail.com | +216 27 932 190", normalFont));
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Generate Payment Link for a booking
     */
    public String generatePaymentLink(Long bookingId, String customerName, String customerEmail,
                                       String carName, String startDate, String endDate,
                                       Double amount, String phone) {
        try {
            String params = String.format(
                "amount=%s&bookingId=%s&carName=%s&startDate=%s&endDate=%s&customerName=%s&customerEmail=%s&phone=%s",
                amount.intValue(),
                bookingId,
                URLEncoder.encode(carName, StandardCharsets.UTF_8),
                startDate,
                endDate,
                URLEncoder.encode(customerName, StandardCharsets.UTF_8),
                URLEncoder.encode(customerEmail, StandardCharsets.UTF_8),
                URLEncoder.encode(phone != null ? phone : "", StandardCharsets.UTF_8)
            );

            String encodedData = Base64.getUrlEncoder().encodeToString(params.getBytes(StandardCharsets.UTF_8));
            return FRONTEND_URL + "/payment?data=" + encodedData;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Send Payment Link via Email
     */
    public void sendPaymentLinkEmail(String email, String customerName, String carName,
                                      String startDate, String endDate, Double amount,
                                      Long bookingId, String phone) {
        String paymentLink = generatePaymentLink(bookingId, customerName, email, carName, startDate, endDate, amount, phone);
        
        String subject = "Complete Your Payment - MyLoc Car Rental";
        String htmlContent = buildPaymentLinkEmailHtml(customerName, carName, startDate, endDate, amount, paymentLink);
        
        emailService.sendHtmlEmail(email, subject, htmlContent);
    }

    // ==================== PRIVATE HELPER METHODS ====================

    private byte[] generateQRCode(ReportRequest reportRequest) {
        try {
            ByteArrayOutputStream stream = QRCode.from(reportRequest.getQrCode())
                .withSize(300, 300)
                .stream();
            return stream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return new byte[0];
        }
    }

    private byte[] generatePaymentQRCode(String transactionId, String customerName, String carName, String amount) {
        try {
            String qrContent = String.format(
                "MyLoc Payment\nTransaction: %s\nCustomer: %s\nCar: %s\nAmount: $%s",
                transactionId, customerName, carName, amount
            );
            ByteArrayOutputStream stream = QRCode.from(qrContent)
                .withSize(300, 300)
                .stream();
            return stream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return new byte[0];
        }
    }

    private byte[] generatePDFReport(ReportRequest reportRequest, byte[] qrCodeImage) {
        try {
            Document document = new Document();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = PdfWriter.getInstance(document, baos);

            writer.setPageEvent(new PdfPageEventHelper() {
                public void onEndPage(PdfWriter writer, Document document) {
                    try {
                        ColumnText.showTextAligned(
                            writer.getDirectContent(),
                            Element.ALIGN_RIGHT,
                            new Phrase(new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date())),
                            document.right() - 20,
                            document.top() + 15,
                            0
                        );

                        try {
                            URL logoUrl = getClass().getResource("/static/images/logo2.png");
                            if (logoUrl != null) {
                                Image logo = Image.getInstance(logoUrl);
                                logo.scaleToFit(250, 250);
                                float xPosition = (float) (((document.right() * 1.1) - document.left() - logo.getScaledWidth()) / 2);
                                logo.setAbsolutePosition(xPosition, document.bottom() - 2);
                                writer.getDirectContent().addImage(logo);
                            }
                        } catch (Exception e) {
                            System.err.println("Error loading logo: " + e.getMessage());
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });

            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
            Font labelFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font contentFont = new Font(Font.FontFamily.HELVETICA, 12);
            Font thanksFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC);

            Paragraph title = new Paragraph("Confirmation de Réservation", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20f);
            document.add(title);

            Paragraph greeting = new Paragraph("Chèr(e) Notre Client(e)", labelFont);
            greeting.setAlignment(Element.ALIGN_CENTER);
            greeting.setSpacingAfter(15f);
            document.add(greeting);

            Paragraph clientInfo = new Paragraph();
            clientInfo.add(new Chunk("Nom: ", labelFont));
            clientInfo.add(new Chunk(reportRequest.getName() + "\n", contentFont));
            clientInfo.add(new Chunk("Email: ", labelFont));
            clientInfo.add(new Chunk(reportRequest.getEmail() + "\n", contentFont));
            clientInfo.add(new Chunk("Message: ", labelFont));
            clientInfo.add(new Chunk(reportRequest.getMessage(), contentFont));
            clientInfo.setAlignment(Element.ALIGN_CENTER);
            clientInfo.setSpacingAfter(20f);
            document.add(clientInfo);

            Image qrImage = Image.getInstance(qrCodeImage);
            qrImage.scaleToFit(150, 150);
            qrImage.setAlignment(Element.ALIGN_CENTER);
            document.add(qrImage);

            Paragraph thanks = new Paragraph(
                "\n\nNous vous remercions de votre confiance.\n" +
                "Pour toute question supplémentaire, notre équipe reste à votre disposition.",
                thanksFont
            );
            thanks.setAlignment(Element.ALIGN_CENTER);
            thanks.setSpacingBefore(15f);
            document.add(thanks);

            document.close();
            return baos.toByteArray();

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void addTableRow(PdfPTable table, String label, String value, Font labelFont, Font valueFont) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, labelFont));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(8);
        labelCell.setBackgroundColor(new BaseColor(249, 250, 251));

        PdfPCell valueCell = new PdfPCell(new Phrase(value, valueFont));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(8);

        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    private String buildPaymentLinkEmailHtml(String customerName, String carName, String startDate,
                                              String endDate, Double amount, String paymentLink) {
        return "<!DOCTYPE html>" +
            "<html><head><meta charset='UTF-8'></head>" +
            "<body style='font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5;'>" +
            "<div style='max-width: 600px; margin: 0 auto; background: white;'>" +
            
            "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;'>" +
            "<h1 style='color: white; margin: 0;'>🚗 MyLoc Car Rental</h1>" +
            "<p style='color: rgba(255,255,255,0.9); margin: 10px 0 0;'>Complete Your Payment</p>" +
            "</div>" +
            
            "<div style='padding: 30px;'>" +
            "<p style='color: #333; font-size: 16px;'>Dear <strong>" + customerName + "</strong>,</p>" +
            "<p style='color: #666;'>Your booking is almost complete! Please click the button below to securely pay for your reservation.</p>" +
            
            "<div style='background: #f8f9ff; border-radius: 12px; padding: 20px; margin: 25px 0;'>" +
            "<h3 style='margin: 0 0 15px; color: #6366f1;'>Booking Summary</h3>" +
            "<p style='margin: 8px 0; color: #666;'><strong>Car:</strong> " + carName + "</p>" +
            "<p style='margin: 8px 0; color: #666;'><strong>Pick-up:</strong> " + startDate + "</p>" +
            "<p style='margin: 8px 0; color: #666;'><strong>Return:</strong> " + endDate + "</p>" +
            "<p style='margin: 15px 0 0; font-size: 24px; color: #6366f1;'><strong>Total: $" + amount.intValue() + "</strong></p>" +
            "</div>" +
            
            "<div style='text-align: center; margin: 30px 0;'>" +
            "<a href='" + paymentLink + "' style='display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px;'>💳 Pay Now Securely</a>" +
            "</div>" +
            
            "<p style='color: #999; font-size: 12px; text-align: center;'>This link will expire in 24 hours.</p>" +
            "</div>" +
            
            "<div style='background: #1f2937; padding: 20px; text-align: center;'>" +
            "<p style='color: white; margin: 0;'>Thank you for choosing MyLoc!</p>" +
            "<p style='color: #9ca3af; margin: 10px 0 0; font-size: 12px;'>myloclac2@gmail.com | +216 27 932 190</p>" +
            "</div>" +
            
            "</div></body></html>";
    }
}