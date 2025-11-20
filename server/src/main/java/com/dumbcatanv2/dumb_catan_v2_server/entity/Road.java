package com.dumbcatanv2.dumb_catan_v2_server.entity;

import jakarta.persistence.*;

@Entity
@Table(name="roads")
public class Road {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int roadId;

    @Column(name="roadNumber")
    private int roadNumber;

    @Column(name="color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "gameId")
    private Game game;

    public int getRoadId() {
        return roadId;
    }

    public void setRoadId(int roadId) {
        this.roadId = roadId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public int getRoadNumber() {
        return roadNumber;
    }

    public void setRoadNumber(int roadNumber) {
        this.roadNumber = roadNumber;
    }

    public Road(int roadId, String color, Game game, int roadNumber) {
        this.roadId = roadId;
        this.color = color;
        this.game = game;
        this.roadNumber = roadNumber;
    }

    public Road(){}
}