package com.dumbcatanv2.dumb_catan_v2_server.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final int userID;
    private final String username;
    private String role;
    private final String password;
    private final int activeGames;
    private final String avatarURL;

    public CustomUserDetails(int userID, String username, String role, String password, int activeGames, String avatarURL) {
        this.userID = userID;
        this.username = username;
        this.role = role;
        this.password = password;
        this.activeGames = activeGames;
        this.avatarURL = avatarURL;
    }

    public String getRole() { return role; }

    public int getUserID() {
        return userID;
    }

    public int getActiveGames(){
        return activeGames;
    }

    public String getAvatarURL(){
        return avatarURL;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
