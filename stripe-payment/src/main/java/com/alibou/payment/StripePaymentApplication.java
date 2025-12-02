package com.alibou.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StripePaymentApplication {

    public static void main(String[] args) {
        SpringApplication.run(StripePaymentApplication.class, args);
        System.out.println("========================================");
        System.out.println("  Stripe Payment Service Started");
        System.out.println("  Port: 8081");
        System.out.println("========================================");
    }
}