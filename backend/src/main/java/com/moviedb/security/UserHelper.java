package com.moviedb.security;

import com.moviedb.model.User;
import com.moviedb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {
    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser() {
        // Get the username from the Spring Security Context
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}