package com.example.comparateur.Entity.chat;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int messageId;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    @Column(name = "sender_email", nullable = false)
    private String senderEmail;

    @Column(name = "time", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    @ManyToOne
    @JoinColumn(name = "reply_message")
    private Message replyMessage;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    public Message() {}

    public Message(String content, String senderEmail, Date time) {
        this.content = content;
        this.senderEmail = senderEmail;
        this.time = time;
    }

    // Getters and setters
    public int getMessageId() { return messageId; }
    public void setMessageId(int messageId) { this.messageId = messageId; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getSenderEmail() { return senderEmail; }
    public void setSenderEmail(String senderEmail) { this.senderEmail = senderEmail; }
    public Date getTime() { return time; }
    public void setTime(Date time) { this.time = time; }
    public Message getReplyMessage() { return replyMessage; }
    public void setReplyMessage(Message replyMessage) { this.replyMessage = replyMessage; }
    public Chat getChat() { return chat; }
    public void setChat(Chat chat) { this.chat = chat; }
}