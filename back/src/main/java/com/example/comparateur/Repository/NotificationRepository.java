package com.example.comparateur.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.comparateur.Entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientAndSeenFalse(String recipient);


    List<Notification> findByRecipient(String recipient);
}
