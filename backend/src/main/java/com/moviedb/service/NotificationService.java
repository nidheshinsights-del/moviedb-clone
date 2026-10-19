package com.moviedb.service;

import com.moviedb.dto.NotificationResponse;
import com.moviedb.model.Follow;
import com.moviedb.model.Movie;
import com.moviedb.model.Notification;
import com.moviedb.model.User;
import com.moviedb.repository.FollowRepository;
import com.moviedb.repository.NotificationRepository;
import com.moviedb.security.UserHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserHelper userHelper;

    public void notifyFollowers(Movie movie) {
        if (movie.getStars() == null || movie.getStars().isEmpty()) return;

        for (String actorName : movie.getStars()) {
            List<Follow> followers = followRepository.findByActorName(actorName);
            for (Follow follow : followers) {
                Notification notification = new Notification();
                notification.setUser(follow.getUser());
                notification.setMovie(movie);
                notification.setActorName(actorName);
                notification.setMessage(actorName + " is starring in a new movie: \"" + movie.getTitle() + "\"");
                notification.setRead(false);
                notificationRepository.save(notification);
            }
        }
    }

    public List<NotificationResponse> getNotifications(boolean unreadOnly) {
        User user = userHelper.getCurrentUser();
        List<Notification> notifications = unreadOnly 
                ? notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user)
                : notificationRepository.findByUserOrderByCreatedAtDesc(user);

        return notifications.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public long getUnreadCount() {
        return notificationRepository.countByUserAndIsReadFalse(userHelper.getCurrentUser());
    }

    public NotificationResponse markAsRead(Long id) {
        User user = userHelper.getCurrentUser();
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        notification.setRead(true);
        notificationRepository.save(notification);
        return mapToResponse(notification);
    }

    private NotificationResponse mapToResponse(Notification n) {
        return NotificationResponse.builder()
                .id(n.getId().toString())
                .user(n.getUser().getId().toString())
                .movie(NotificationResponse.MovieInfo.builder()
                        .id(n.getMovie().getId().toString())
                        .title(n.getMovie().getTitle())
                        .year(n.getMovie().getReleaseYear())
                        .type(n.getMovie().getType())
                        .build())
                .actorName(n.getActorName())
                .message(n.getMessage())
                .isRead(n.isRead())
                .createdAt(n.getCreatedAt())
                .updatedAt(n.getCreatedAt())
                .build();
    }
}