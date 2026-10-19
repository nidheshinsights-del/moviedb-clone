package com.moviedb.repository;

import com.moviedb.model.Notification;
import com.moviedb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Get all notifications for a user, newest first
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    
    // Get only unread notifications
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);
    
    // Count unread notifications
    long countByUserAndIsReadFalse(User user);
}