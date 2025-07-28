package com.example.comparateur.Exception.chat;



public class ChatAlreadyExistException extends Exception {

    public ChatAlreadyExistException() {
        super("Chat already exists");
    }

    public ChatAlreadyExistException(String message) {
        super(message);
    }
}
