package com.moviedb.controller;

import com.moviedb.model.Movie;
import com.moviedb.repository.MovieRepository;
import com.moviedb.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/movies")
public class AdminMovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        if (movie.getStatus() == null) {
            movie.setStatus("published");
        }
        
        Movie savedMovie = movieRepository.save(movie);
        
        // THIS TRIGGERS THE NOTIFICATIONS
        notificationService.notifyFollowers(savedMovie);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Movie added successfully",
                "movie", savedMovie
        ));
    }
}