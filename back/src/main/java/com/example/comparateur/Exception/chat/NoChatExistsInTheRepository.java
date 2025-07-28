package com.example.comparateur.Exception.chat;

public class NoChatExistsInTheRepository extends Exception {

    public NoChatExistsInTheRepository() {
        super("No chats exist in the repository");
    }

    public NoChatExistsInTheRepository(String message) {
        super(message);
    }
}
