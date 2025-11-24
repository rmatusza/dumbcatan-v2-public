package com.dumbcatanv2.dumb_catan_v2_server.entity;

import jakarta.persistence.*;

@Entity
@Table(name="invites")
public class Invite {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int inviteId;

    @ManyToOne
    @JoinColumn(name = "gameId", nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public int getInviteId() {
        return inviteId;
    }

    public void setInviteId(int inviteId) {
        this.inviteId = inviteId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Invite(Game game, User user) {
        this.game = game;
        this.user = user;
    }

    public Invite(){}
}
