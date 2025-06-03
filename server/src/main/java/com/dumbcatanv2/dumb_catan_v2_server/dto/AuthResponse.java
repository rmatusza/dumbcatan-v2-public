package com.dumbcatanv2.dumb_catan_v2_server.dto;

public class AuthResponse {
    private String token;
    private UserDataResponse userData;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDataResponse getUserData() {
        return userData;
    }

    public void setUserData(UserDataResponse userData) {
        this.userData = userData;
    }

    public AuthResponse(UserDataResponse userData, String token) {
        this.userData = userData;
        this.token = token;
    }

    public AuthResponse(){}
}
