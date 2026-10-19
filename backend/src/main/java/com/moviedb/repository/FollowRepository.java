package com.moviedb.repository;

import com.moviedb.model.Follow;
import com.moviedb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    // Find all follows for a specific user
    List<Follow> findByUser(User user);
    
    // Check if a user is already following an actor
    Optional<Follow> findByUserAndActorName(User user, String actorName);
    
    // Find all users following a specific actor (Crucial for Notifications)
    List<Follow> findByActorName(String actorName);
}