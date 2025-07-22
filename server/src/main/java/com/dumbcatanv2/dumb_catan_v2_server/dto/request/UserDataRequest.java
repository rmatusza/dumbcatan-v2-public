package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/* DTO for updating user data */
// userId provided through path variable
public class UserDataRequest {

    @Size(min=1, max=15)
    private String username = "NONE";

    @Size(min=1, max=15)
    private String password = "NONE";

    @NotNull
    private String avatarURL = "NONE";

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

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    @Override
    public String toString() {

        System.out.println(this.username + "\n");
        System.out.println(this.password + "\n");
        System.out.println(this.avatarURL + "\n");
        return "";
    }

    public UserDataRequest(int userId, String username, String password, String avatarURL) {
        this.username = username;
        this.password = password;
        this.avatarURL = avatarURL;
    }
}
