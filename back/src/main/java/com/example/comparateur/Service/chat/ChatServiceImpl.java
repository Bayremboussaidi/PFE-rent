package com.example.comparateur.Service.chat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.comparateur.Entity.Agence;
import com.example.comparateur.Entity.admin.Admin;
import com.example.comparateur.Entity.chat.Chat;
import com.example.comparateur.Entity.chat.Message;
import com.example.comparateur.Exception.chat.ChatNotFoundException;
import com.example.comparateur.Exception.chat.NoChatExistsInTheRepository;
import com.example.comparateur.Repository.AgenceRepository;
import com.example.comparateur.Repository.admin.AdminRepository;
import com.example.comparateur.Repository.chat.ChatRepository;
import com.example.comparateur.Repository.chat.MessageRepository;

@Service
public class ChatServiceImpl {

    @Autowired
    private ChatRepository chatRepository;
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private AgenceRepository agenceRepository;

    public Chat addChat(Chat chat) {
        return chatRepository.save(chat);
    }

    public List<Chat> findAllChats() throws NoChatExistsInTheRepository {
        List<Chat> chats = chatRepository.findAll();
        if (chats.isEmpty()) {
            throw new NoChatExistsInTheRepository();
        }
        return chats;
    }

    public Chat getById(int id) throws ChatNotFoundException {
        return chatRepository.findById(id)
                .orElseThrow(ChatNotFoundException::new);
    }

    public List<Chat> getChatByFirstUserEmail(String email) throws ChatNotFoundException {
        List<Chat> chats = chatRepository.findByFirstUserEmail(email);
        if (chats.isEmpty()) {
            throw new ChatNotFoundException();
        }
        return chats;
    }

    public List<Chat> getChatBySecondUserEmail(String email) throws ChatNotFoundException {
        List<Chat> chats = chatRepository.findBySecondUserEmail(email);
        if (chats.isEmpty()) {
            throw new ChatNotFoundException();
        }
        return chats;
    }

    public List<Chat> getChatByFirstUserEmailOrSecondUserEmail(String email) throws ChatNotFoundException {
        List<Chat> chats = chatRepository.findByFirstUserEmailOrSecondUserEmail(email);
        if (chats.isEmpty()) {
            throw new ChatNotFoundException();
        }
        return chats;
    }

    public List<Chat> getChatByFirstUserEmailAndSecondUserEmail(String firstUserEmail, String secondUserEmail)
            throws ChatNotFoundException {
        List<Chat> chats = chatRepository.findChatByEmailsBidirectional(firstUserEmail, secondUserEmail);
        if (chats.isEmpty()) {
            throw new ChatNotFoundException();
        }
        return chats;
    }

    @Transactional
    public Chat addMessage(Message newMessage, int chatId) throws ChatNotFoundException {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(ChatNotFoundException::new);

        newMessage.setChat(chat);
        if (chat.getMessageList() == null) {
            chat.setMessageList(new ArrayList<>());
        }
        chat.getMessageList().add(newMessage);
        return chatRepository.save(chat);
    }

    public Chat createNewChatBetweenUsers(String email1, String email2) throws Exception {
        UserDetails user1 = getUserDetails(email1);
        UserDetails user2 = getUserDetails(email2);

        // Determine order based on email comparison
        boolean order = email1.compareTo(email2) < 0;

        Chat newChat = new Chat();
        if (order) {
            newChat.setFirstUserEmail(email1);
            newChat.setFirstUserName(user1.username());
            newChat.setSecondUserEmail(email2);
            newChat.setSecondUserName(user2.username());
        } else {
            newChat.setFirstUserEmail(email2);
            newChat.setFirstUserName(user2.username());
            newChat.setSecondUserEmail(email1);
            newChat.setSecondUserName(user1.username());
        }
        newChat.setMessageList(new ArrayList<>());
        return chatRepository.save(newChat);
    }

    private UserDetails getUserDetails(String email) throws Exception {
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            return new UserDetails(admin.get().getEmail(), admin.get().getUsername());
        }

        Optional<Agence> agence = agenceRepository.findByEmail(email);
        if (agence.isPresent()) {
            return new UserDetails(agence.get().getEmail(), agence.get().getAgencyName());
        }

        throw new Exception("User not found with email: " + email);
    }

    private record UserDetails(String email, String username) {}
}