package com.example.comparateur.DTO;


public class ReportResponse {
    private String qrCode;
    private byte[] pdfReport;

    // Getters and Setters
    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public byte[] getPdfReport() {
        return pdfReport;
    }

    public void setPdfReport(byte[] pdfReport) {
        this.pdfReport = pdfReport;
    }
}