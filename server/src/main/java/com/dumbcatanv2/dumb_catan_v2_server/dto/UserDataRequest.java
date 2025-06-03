package com.dumbcatanv2.dumb_catan_v2_server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserDataRequest {
    @NotNull
    private int userID;
    @NotNull
    @Size(min=1, max=15)
    private String username = "NONE";
    @NotNull
    @Size(min=1, max=15)
    private String password = "NONE";
    @NotNull
    private String avatarURL = "NONE";

    public UserDataRequest(int userID, String username, String password, String avatarURL) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.avatarURL = avatarURL;
    }

    public UserDataRequest(){}

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

    public int getUserID() {return userID;}

    public void setUserID(int userID) {this.userID = userID;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    @Override
    public String toString() {

        System.out.println(this.userID + "\n");
        System.out.println(this.username + "\n");
        System.out.println(this.password + "\n");
        System.out.println(this.avatarURL + "\n");
        return "";
    }

}
