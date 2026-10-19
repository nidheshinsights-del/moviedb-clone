package com.moviedb.service;

import com.moviedb.model.Follow;
import com.moviedb.model.User;
import com.moviedb.repository.FollowRepository;
import com.moviedb.security.UserHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FollowService {
    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserHelper userHelper;

    public List<String> getFollowedActors() {
        User user = userHelper.getCurrentUser();
        return followRepository.findByUser(user).stream()
                .map(Follow::getActorName)
                .collect(Collectors.toList());
    }

    public String followActor(String actorName) {
        if (actorName == null || actorName.trim().isEmpty()) {
            throw new IllegalArgumentException("Actor name is required");
        }
        User user = userHelper.getCurrentUser();
        Optional<Follow> existing = followRepository.findByUserAndActorName(user, actorName);
        
        if (existing.isPresent()) {
            throw new IllegalStateException("You are already following this actor");
        }
        
        Follow follow = new Follow();
        follow.setUser(user);
        follow.setActorName(actorName);
        followRepository.save(follow);
        
        return "You are now following " + actorName;
    }

    public String unfollowActor(String actorName) {
        if (actorName == null || actorName.trim().isEmpty()) {
            throw new IllegalArgumentException("Actor name is required");
        }
        User user = userHelper.getCurrentUser();
        Optional<Follow> existing = followRepository.findByUserAndActorName(user, actorName);
        
        if (existing.isEmpty()) {
            throw new RuntimeException("You are not following this actor");
        }
        
        followRepository.delete(existing.get());
        return "You have unfollowed " + actorName;
    }
}