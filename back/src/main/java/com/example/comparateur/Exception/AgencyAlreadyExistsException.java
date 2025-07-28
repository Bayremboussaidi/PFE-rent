package com.example.comparateur.Exception;

public class AgencyAlreadyExistsException extends RuntimeException {
    public AgencyAlreadyExistsException(String message) {
        super(message);
    }
}