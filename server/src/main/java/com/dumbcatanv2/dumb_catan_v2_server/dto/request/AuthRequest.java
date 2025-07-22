package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/* DTO for logging in and signing up */
public class AuthRequest {

    @Size(min=1, max=15)
    private String username;

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
