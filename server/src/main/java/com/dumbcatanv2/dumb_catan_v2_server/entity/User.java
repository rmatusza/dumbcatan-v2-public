package com.dumbcatanv2.dumb_catan_v2_server.entity;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userID;

    @Column(name="username")
    private String username;

    @Column(name="role")
    private String role = "user";

    @Column(name="password")
    private String password;

    @Column(name="avatarURL")
    private String avatarURL = "av1";

    @Column(name="activeGames")
    private int activeGames = 0;

    public int getUserID() {
        return userID;
    }

    public void setUserId(int userID) {this.userID = userID;}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    public int getActiveGames() {
        return activeGames;
    }

    public void setActiveGames(int activeGames) {
        this.activeGames = activeGames;
    }

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}

    public User(int userID, String username, String password, String avatarURL, int activeGames, String role) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.avatarURL = avatarURL;
        this.activeGames = activeGames;
        this.role = role;
    }

    public User(String username, String password, String avatarURL, int activeGames, String role) {
        this.username = username;
        this.password = password;
        this.avatarURL = avatarURL;
        this.activeGames = activeGames;
        this.role = role;
    }

    public User(String username, String password, String avatarURL, int activeGames) {
        this.username = username;
        this.password = password;
        this.avatarURL = avatarURL;
        this.activeGames = activeGames;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(){}
}
