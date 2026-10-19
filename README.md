# 🎬 MovieDB - Full Stack Application

A full-stack web application for a Movie Database featuring JWT authentication, actor following, and an automated notification system. 

## 📌 Project Overview

This project was built to fulfill the "MovieDB (Java Spring Boot + React): Actor Follow & Notification System" assignment. The core feature allows users to follow their favorite actors. When an Administrator adds a new movie starring those actors, the system automatically generates notifications for all followers.

## 🚀 Tech Stack

**Backend:**
*   **Java 17+ / Spring Boot 3.2.4**
*   **Spring Security & JWT** (Stateless authentication)
*   **Spring Data JPA / Hibernate**
*   **H2 In-Memory Database**
*   **Lombok** (Bypassed for specific entities due to Java 25 compatibility issues)

**Frontend:**
*   **React (Vite)**
*   **Tailwind CSS** (Styling)
*   **React Router DOM** (Routing)
*   **React Hot Toast** (Notifications)
*   **React Icons**

## ✨ Features Implemented

1.  **Authentication:** Secure registration and login using BCrypt password hashing and JWT generation.
2.  **Role-Based Access Control (RBAC):** Standard users can follow actors and view notifications. Admins can also add movies.
3.  **Actor Following System:** Users can follow/unfollow actors from the UI.
4.  **Admin Dashboard:** A dedicated UI for Admins to add new movies and specify the cast (actors).
5.  **Automated Notifications:** 
    *   When an Admin adds a movie, the backend scans the cast list.
    *   It finds all users who follow those actors.
    *   It automatically generates a personalized notification for each user.
6.  **Notification Center:** Users have a dedicated page to view their notifications and mark them as read. The Navbar includes a live unread count badge.

## 🛠️ Prerequisites

To run this project, you need:
*   Java 17 (or higher) installed.
*   Node.js (v18+) and npm installed.
*   Maven installed.

## 🏃‍♂️ How to Run Locally

You need to run the backend and frontend simultaneously in two separate terminals.

### 1. Start the Backend (Spring Boot)
```bash
# Navigate to the backend directory
cd backend

# Run the Spring Boot application
mvn spring-boot:run


# Navigate to the frontend directory
cd frontend

# Install dependencies (only needed the first time)
npm install

# Start the Vite development server
npm run dev