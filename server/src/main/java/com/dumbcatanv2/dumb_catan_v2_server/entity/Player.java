package com.dumbcatanv2.dumb_catan_v2_server.entity;

import com.dumbcatanv2.dumb_catan_v2_server.util.IntArrayConverter;
import com.dumbcatanv2.dumb_catan_v2_server.util.StringListConverter;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="players")
public class Player {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int playerId;

    @Lob
    @Convert(converter = StringListConverter.class)
    @Column(name="resourceCards")
    private List<String> resourceCards;

    @Lob
    @Convert(converter = StringListConverter.class)
    @Column(name="playableDevCards")
    private List<String> playableDevCards;

    @Lob
    @Convert(converter = StringListConverter.class)
    @Column(name="unplayableDevCards")
    private List<String> unplayableDevCards;

    @Convert(converter = IntArrayConverter.class)
    @Column(name="startingNodes")
    private int[] startingNodes;

    @Column(name="armySize")
    private int armySize;

    @Column(name="points")
    private int points;

    @Column(name="color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "gameId")
    private Game game;

    public int getArmySize() {
        return armySize;
    }

    public void setArmySize(int armySize) {
        this.armySize = armySize;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<String> getPlayableDevCards() {
        return playableDevCards;
    }

    public void setPlayableDevCards(List<String> playableDevCards) {
        this.playableDevCards = playableDevCards;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public List<String> getResourceCards() {
        return resourceCards;
    }

    public void setResourceCards(List<String> resourceCards) {
        this.resourceCards = resourceCards;
    }

    public int[] getStartingNodes() {
        return startingNodes;
    }

    public void setStartingNodes(int[] startingNodes) {
        this.startingNodes = startingNodes;
    }

    public List<String> getUnplayableDevCards() {
        return unplayableDevCards;
    }

    public void setUnplayableDevCards(List<String> unplayableDevCards) {
        this.unplayableDevCards = unplayableDevCards;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public static Player createInitial() {
        Player initialPlayerData = new Player();
        initialPlayerData.setResourceCards(new ArrayList<>());
        initialPlayerData.setPlayableDevCards(new ArrayList<>());
        initialPlayerData.setUnplayableDevCards(new ArrayList<>());
        initialPlayerData.setStartingNodes(new int[2]);
        return initialPlayerData;
    }

    public Player(int armySize, Game game, List<String> playableDevCards, int playerId, int points, List<String> resourceCards, int[] startingNodes, List<String> unplayableDevCards, User user) {
        this.armySize = armySize;
        this.game = game;
        this.playableDevCards = playableDevCards;
        this.playerId = playerId;
        this.points = points;
        this.resourceCards = resourceCards;
        this.startingNodes = startingNodes;
        this.unplayableDevCards = unplayableDevCards;
        this.user = user;
    }

    public Player(){}
}
