package com.moviedb.controller;

import com.moviedb.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/follow")
public class FollowController {
    @Autowired
    private FollowService followService;

    @GetMapping("/")
    public ResponseEntity<List<String>> getFollowedActors() {
        return ResponseEntity.ok(followService.getFollowedActors());
    }

    @PostMapping("/follow")
    public ResponseEntity<?> follow(@RequestBody Map<String, String> body) {
        try {
            String msg = followService.followActor(body.get("actorName"));
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", msg));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/unfollow")
    public ResponseEntity<?> unfollow(@RequestBody Map<String, String> body) {
        try {
            String msg = followService.unfollowActor(body.get("actorName"));
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}