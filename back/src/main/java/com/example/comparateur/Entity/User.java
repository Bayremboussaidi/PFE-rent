package com.example.comparateur.Entity;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Change type to Long for JPA compatibility

    private String username;
    private String email;
    private String password;
    
    @Lob
    @Column(name = "photo", columnDefinition = "LONGTEXT")
    private String photo;


@Column(nullable = false)
@Positive
@Digits(integer = 15, fraction = 0)
private Long phone;
    
    @Column(nullable = true, length = 255)
    private String workplace;



@Enumerated(EnumType.STRING)
@Column(nullable = false)
    private Role role; 

    private Date createdAt;
    private Date updatedAt;



}