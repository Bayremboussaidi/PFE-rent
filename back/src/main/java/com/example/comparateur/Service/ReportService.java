package com.example.comparateur.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comparateur.DTO.ReportRequest;
import com.example.comparateur.DTO.ReportResponse;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

import net.glxn.qrgen.javase.QRCode;



@Service
public class ReportService {

    @Autowired
    private EmailService emailService;

    public ReportResponse generateReport(ReportRequest reportRequest) {
        // Generate QR code
        byte[] qrCodeImage = generateQRCode(reportRequest);

        // Generate PDF
        byte[] pdfReport = generatePDFReport(reportRequest, qrCodeImage);

        // Send email with PDF attachment
        emailService.sendEmailWithAttachment(reportRequest.getEmail(),
            "Your Booking Confirmation",
            "Please find your booking confirmation attached.",
            pdfReport);

        // Create response
        ReportResponse reportResponse = new ReportResponse();
        reportResponse.setQrCode(java.util.Base64.getEncoder().encodeToString(qrCodeImage));
        reportResponse.setPdfReport(pdfReport);

        return reportResponse;
    }

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

    private byte[] generatePDFReport(ReportRequest reportRequest, byte[] qrCodeImage) {
        try {
            Document document = new Document();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = PdfWriter.getInstance(document, baos);

            // Add header with date/time
            writer.setPageEvent(new PdfPageEventHelper() {
                public void onEndPage(PdfWriter writer, Document document) {
                    try {
                        // Existing date/time header
                        ColumnText.showTextAligned(
                            writer.getDirectContent(),
                            Element.ALIGN_RIGHT,
                            new Phrase(new SimpleDateFormat("dd/MM/yyyy HH:mm").format(new Date())),
                            document.right() - 20,
                            document.top() + 15,
                            0
                        );
    
                        // ===== NEW LOGO CODE =====
                        try {
                            // Replace this URL with your actual logo path
                            URL logoUrl = getClass().getResource("/static/images/logo2.png");
                            Image logo = Image.getInstance(logoUrl);
                            
                            // Logo sizing and positioning
                            logo.scaleToFit(250, 250); // Width, height in pixels
                            float xPosition = (float) (((document.right()*1.1) - document.left() - logo.getScaledWidth()) / 2);
                            logo.setAbsolutePosition(
                                xPosition, // Centered horizontally
                                document.bottom() -2 // 100 units above bottom
                            );
                            
                            writer.getDirectContent().addImage(logo);
                        } catch (Exception e) {
                            System.err.println("Error loading logo: " + e.getMessage());
                        }
                        // ===== END LOGO CODE =====
                        
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });

            document.open();

            // Font styling
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
            Font labelFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font contentFont = new Font(Font.FontFamily.HELVETICA, 12);
            Font thanksFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC);

            // Title
            Paragraph title = new Paragraph("Confirmation de Réservation", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20f);
            document.add(title);

            // Client greeting
            Paragraph greeting = new Paragraph("Chèr(e) Notre Client(e)", labelFont);
            greeting.setAlignment(Element.ALIGN_CENTER);
            greeting.setSpacingAfter(15f);
            document.add(greeting);

            // Client info
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

            // QR Code
            Image qrImage = Image.getInstance(qrCodeImage);
            qrImage.scaleToFit(150, 150);
            qrImage.setAlignment(Element.ALIGN_CENTER);
            document.add(qrImage);

            // Thank you paragraph
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
}