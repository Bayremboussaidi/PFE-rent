package com.example.comparateur.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.comparateur.Entity.Notification;
import com.example.comparateur.Repository.NotificationRepository;

@Service
public class NotificationService {

@Autowired
private NotificationRepository notificationRepository;

public Notification createNotification(Notification notification) {
    return notificationRepository.save(notification);
}

public List<Notification> getUnreadNotifications(String recipient) {
    return notificationRepository.findByRecipientAndSeenFalse(recipient);
}

  // Method to get all notifications
public List<Notification> getAllNotifications() {
    return notificationRepository.findAll();
}



public List<Notification> getNotificationsByRecipient(String recipient) {
        return notificationRepository.findByRecipient(recipient);
}

}