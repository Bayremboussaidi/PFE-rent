package com.example.comparateur.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {
    @NotBlank
    private String username;
    
    @Email
    private String email;
    
    @NotNull
    @Positive
    private Long phone;
    
    private String role;
    private String workplace;
    private String photo;
}