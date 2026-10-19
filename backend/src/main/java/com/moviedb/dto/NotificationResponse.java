package com.moviedb.dto;

import java.time.LocalDateTime;

public class NotificationResponse {
    private String id;
    private String user;
    private MovieInfo movie;
    private String actorName;
    private String message;
    @JsonProperty("isRead")
    private boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // --- GETTERS AND SETTERS ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public MovieInfo getMovie() { return movie; }
    public void setMovie(MovieInfo movie) { this.movie = movie; }
    public String getActorName() { return actorName; }
    public void setActorName(String actorName) { this.actorName = actorName; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // --- MANUAL BUILDER ---
    public static NotificationResponseBuilder builder() {
        return new NotificationResponseBuilder();
    }

    public static class NotificationResponseBuilder {
        private NotificationResponse response = new NotificationResponse();

        public NotificationResponseBuilder id(String id) { response.id = id; return this; }
        public NotificationResponseBuilder user(String user) { response.user = user; return this; }
        public NotificationResponseBuilder movie(MovieInfo movie) { response.movie = movie; return this; }
        public NotificationResponseBuilder actorName(String actorName) { response.actorName = actorName; return this; }
        public NotificationResponseBuilder message(String message) { response.message = message; return this; }
        public NotificationResponseBuilder isRead(boolean isRead) { response.isRead = isRead; return this; }
        public NotificationResponseBuilder createdAt(LocalDateTime createdAt) { response.createdAt = createdAt; return this; }
        public NotificationResponseBuilder updatedAt(LocalDateTime updatedAt) { response.updatedAt = updatedAt; return this; }
        public NotificationResponse build() { return response; }
    }

    // --- NESTED MOVIEINFO CLASS ---
    public static class MovieInfo {
        private String id;
        private String title;
        private int year;
        private String type;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public int getYear() { return year; }
        public void setYear(int year) { this.year = year; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public static MovieInfoBuilder builder() {
            return new MovieInfoBuilder();
        }

        public static class MovieInfoBuilder {
            private MovieInfo info = new MovieInfo();
            public MovieInfoBuilder id(String id) { info.id = id; return this; }
            public MovieInfoBuilder title(String title) { info.title = title; return this; }
            public MovieInfoBuilder year(int year) { info.year = year; return this; }
            public MovieInfoBuilder type(String type) { info.type = type; return this; }
            public MovieInfo build() { return info; }
        }
    }
}