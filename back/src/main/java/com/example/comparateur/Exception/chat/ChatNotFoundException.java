package com.example.comparateur.Exception.chat;



public class ChatNotFoundException extends Exception {

    public ChatNotFoundException() {
        super("Chat not found");
    }

    public ChatNotFoundException(String message) {
        super(message);
    }
}

