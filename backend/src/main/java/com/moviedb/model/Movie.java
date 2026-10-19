package com.moviedb.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    
    @Column(name = "release_year") 
    private int releaseYear;
    
    private String type;
    private String status;
    
    @ElementCollection
    @CollectionTable(name = "movie_stars", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "star")
    private List<String> stars; 

    // --- MANUAL GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getReleaseYear() { return releaseYear; }
    public void setReleaseYear(int releaseYear) { this.releaseYear = releaseYear; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getStars() { return stars; }
    public void setStars(List<String> stars) { this.stars = stars; }
}