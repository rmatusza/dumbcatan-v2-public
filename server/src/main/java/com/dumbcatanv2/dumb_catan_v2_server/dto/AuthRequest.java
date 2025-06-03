package com.dumbcatanv2.dumb_catan_v2_server.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AuthRequest {

    @NotNull
    @Size(min=1, max=15)
    private String username;

    @NotNull
    @Size(min=1, max=15)
    private String password;

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

    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
