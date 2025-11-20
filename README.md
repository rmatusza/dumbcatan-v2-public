# Dumb Catan

### This application is a browser-based, real-time, multiplayer clone of the "Settlers of Catan" board game built with React.js, Spring Boot, and MySQL
<br></br>

🚧 This project is a work in progress. It is intended to be an improved version of my completed original app which can also be found on my Github page
The features mentioned in this README therefore apply to the future completed application and may not have all been implemented at the time of reading this. A list of the currently implemented features as well as in progress features can be viewed [at the bottom of this file](#feature-progress-log)
<br></br>

🚀 You can run a demo version of this project locally to see and experiment with the features that have currently been implemented by following the instructions outlined in the README file within the [Demo Application Repository](https://github.com/rmatusza/dumbcatan-v2-demo)
<br></br>

# CLIENT APPLICATION:

## 🧩 Features

### User
- Create a profile
- Sign in / out
- View and edit profile - player avatar and username / password
- Create games
- Send, receive, accept, and decline game invitations

### Gameplay
- Real-time multiplayer gameplay
- Implements all the features and rules associated with the base game of Catan

### UI/UX
- Tailwind CSS for layout and styling
- Modal handling using React Portals
- Optimized for desktop/laptop (mobile not supported yet)

### Navigation & State
- React Router for front end routing support
- Redux for global state management

## 🛠️ Tech Stack

- React (functional components + hooks)
- Redux Toolkit
- React Router
- React Hook Form
- Tailwind CSS
- WebSocket (STOMP + SockJS)
- Docker (for containerization)
- AWS (for deployment)

<br></br>

# SERVER APPLICATION: 

## 🧩 Features

### REST API
- Exposes a RESTful API that enables the client application to perform database operations

### Persistence
- MySQL database 
- Spring Data JPA with Hibernate ORM

### WebSocket Communication
- STOMP + SockJS
- Enables real-time gameplay

### Security
- Spring Security for implementing JWT-based authentication
- Password hashing for secure storage

## 🛠️ Tech Stack

- Java 17+
- Spring Boot
- WebSocket (STOMP + SockJS)
- Spring Security (JWT Auth)
- Spring Data JPA + Hibernate
- MySQL
- Docker (for containerization)
- AWS (for deployment)

<br></br>

# FEATURE PROGRESS LOG:

## Implemented Features
- Auto signin with valid JWT
- Sign in with credentials
- Sign up
- Sign out
- Home Page: root of the application after authentication
- Banner component: contains user's avatar, username, and signout button
- Main Menu: drawer component that provides the user with a variety of options, including creating a game, checking invites, accessing the official rules, etc.
- User profile: allows user to view and edit their avatar, username, and password
- Background / Ambient music
- Creating games
- Deleting games
- Viewing all active games
- Resuming an exited game

## In Progress
- Configuring Websockets
- Adding user interaction sound effects

<br></br>

# Why Is This Application Called "Dumb Catan" ?
The name takes inspiration from a TV show called "Nathan for You" in which Nathan Fielder, the host, attempts to help failing businesses get back on their feet by presenting the business owners with convoluted and ridiculous solutions. In one episode Nathan took advantage of California's Parody Law to help a failing coffee shop business by renaming and rebranding their business as "Dumb StarBucks" hoping that passersby would only see the "StarBucks" portion of the name and therefore increase business. It's a great episode and I've provided a link below to the video on youtube. In the same way that "Dumb StarBucks" is a clone of "StarBucks", so too is "Dumb Catan" a clone of one of my favorite board games called "Catan".

<br></br>

Nathan for You - Dumb Starbucks Episode: https://www.youtube.com/watch?v=h0TRpGP8yH4

<br></br>

# App Screenshots:

## Authentication Page - video background:
![alt text](./readme-images/authentication-1.png)
![alt text](./readme-images/authentication-2.png)

## Home Page:
![alt text](./readme-images/home-page.png)

## User Profile:
![alt text](./readme-images/user-profile-1.png)
![alt text](./readme-images/user-profile-2.png)
![alt text](./readme-images/user-profile-3.png)
