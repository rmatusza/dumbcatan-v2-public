package com.dumbcatanv2.dumb_catan_v2_server.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userId;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Player> players;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Invite> invites;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {this.userId = userId;}

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

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> playerData) {
        this.players = players;
    }

    public void addPlayer(Player player) {
        player.setUser(this);
        if (this.players == null) this.players = new ArrayList<>();
        this.players.add(player);
    }

    public void addInvite(Invite invite) {
        invite.setUser(this);
        if (this.invites == null) this.invites = new ArrayList<>();
        this.invites.add(invite);
    }

    public User(int userId, String username, String password, String avatarURL, int activeGames, String role, List<Player> players) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.avatarURL = avatarURL;
        this.activeGames = activeGames;
        this.role = role;
        this.players = players;
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
