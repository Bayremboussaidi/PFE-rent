package com.example.comparateur.Entity;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder // Fix: Add @Builder annotation
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipient; // Username of recipient
    private String message;
    private boolean seen = false;
    private LocalDateTime createdAt;




    @PrePersist
    protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    }
}
