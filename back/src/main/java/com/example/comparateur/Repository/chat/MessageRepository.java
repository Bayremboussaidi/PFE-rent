package com.example.comparateur.Repository.chat;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.comparateur.Entity.chat.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
}
