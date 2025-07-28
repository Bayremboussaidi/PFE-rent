package com.example.comparateur.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.comparateur.Entity.Notification;
import com.example.comparateur.Service.NotificationService;

@RestController
@RequestMapping("/notification")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

@Autowired
private NotificationService notificationService;

@PostMapping
public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
    Notification savedNotification = notificationService.createNotification(notification);
    return ResponseEntity.ok(savedNotification);
}


// get unread notif
@GetMapping("/unread/{recipient}")
public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable String recipient) {
    List<Notification> notifications = notificationService.getUnreadNotifications(recipient);
    return ResponseEntity.ok(notifications);
}



  // Endpoint to get all notifications
@GetMapping("/all")
public ResponseEntity<List<Notification>> getAllNotifications() {
    List<Notification> notifications = notificationService.getAllNotifications();
    return ResponseEntity.ok(notifications);
}




@GetMapping("/recipient/{recipient}")
public ResponseEntity<List<Notification>> getNotificationsByRecipient(@PathVariable String recipient) {
List<Notification> notifications = notificationService.getNotificationsByRecipient(recipient);
return ResponseEntity.ok(notifications);
}
}