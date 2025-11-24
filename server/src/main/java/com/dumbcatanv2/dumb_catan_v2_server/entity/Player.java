package com.dumbcatanv2.dumb_catan_v2_server.entity;

import com.dumbcatanv2.dumb_catan_v2_server.mapper.IntArrayConverter;
import com.dumbcatanv2.dumb_catan_v2_server.mapper.StringListConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="players")
@Data
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
