package com.example.comparateur.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;



@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum BookingStatus {
    PENDING,
    CONFIRMED,
    CANCELED

}