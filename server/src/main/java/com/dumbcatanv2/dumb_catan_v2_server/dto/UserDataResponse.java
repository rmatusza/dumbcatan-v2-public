package com.dumbcatanv2.dumb_catan_v2_server.dto;

public class UserDataResponse {
    private String username;
    private int userID;
    private String role;
    private String avatarURL;
    private int activeGames;

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) {
        this.username = username;
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

    public UserDataResponse(int userID, String username, String role, String avatarURL, int activeGames) {
        this.userID = userID;
        this.username = username;
        this.role = role;
        this.avatarURL = avatarURL;
        this.activeGames = activeGames;
    }

    public UserDataResponse(int userID, String username, String avatarURL) {
        this.userID = userID;
        this.username = username;
        this.avatarURL = avatarURL;
    }

    public UserDataResponse(){}
}
