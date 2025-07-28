package com.example.comparateur.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "agence") // Fixed table annotation
public class Agence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agency_name", nullable = false, length = 100)
    private String agencyName;

    @Column(nullable = false, unique = true, length = 255)
    @Pattern(regexp = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Email invalide")
    private String email;

    @Column(nullable = false, length = 64)
    private String password;

    @Lob
    @Column(name = "photo", columnDefinition = "LONGTEXT")
    private String photo;

    @Column(name = "phone_number", nullable = false, length = 20)
    @Pattern(regexp = "^\\+?[0-9\\s()-]{7,}$", message = "Format de téléphone invalide")
    private String phoneNumber;

    @Column(length = 100)
    private String city;

    // Custom constructor for service layer
    public Agence(String agencyName, String email, String phoneNumber, String city, String photo) {
        this.agencyName = agencyName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.photo = photo;
    }
}