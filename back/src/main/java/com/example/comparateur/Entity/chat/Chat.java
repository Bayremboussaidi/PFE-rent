package com.example.comparateur.Entity.chat;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private int chatId;

    @Column(name = "first_user_email", nullable = false)
    private String firstUserEmail;

    @Column(name = "second_user_email", nullable = false)
    private String secondUserEmail;

    @Column(name = "first_user_name")
    private String firstUserName;
    
    @Column(name = "second_user_name")
    private String secondUserName;

    @JsonManagedReference
    @OneToMany(mappedBy = "chat",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Message> messageList;

    public Chat() {}

    public Chat(String firstUserEmail, String secondUserEmail , String secondUserName  , String firstUserName) {
        this.firstUserEmail = firstUserEmail;
        this.secondUserEmail = secondUserEmail;
        this.firstUserName = firstUserEmail;
        this.secondUserName = secondUserName;
    }

    // Getters and setters
    public int getChatId() { return chatId; }
    public void setChatId(int chatId) { this.chatId = chatId; }
    public String getFirstUserEmail() { return firstUserEmail; }
    public void setFirstUserEmail(String firstUserEmail) { this.firstUserEmail = firstUserEmail; }
    public String getSecondUserEmail() { return secondUserEmail; }
    public void setSecondUserEmail(String secondUserEmail) { this.secondUserEmail = secondUserEmail; }
    public List<Message> getMessageList() { return messageList; }
    public void setMessageList(List<Message> messageList) { this.messageList = messageList; }




    public String getFirstUserName() { return firstUserName; }
    public void setFirstUserName(String firstUserName) { this.firstUserName = firstUserName; }
    public String getSecondUserName() { return secondUserName; }
    public void setSecondUserName(String secondUserName) { this.secondUserName = secondUserName; 
}

}