package com.dumbcatanv2.dumb_catan_v2_server.entity;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateGameRequest;
import com.dumbcatanv2.dumb_catan_v2_server.mapper.ListOfStringListConverter;
import com.dumbcatanv2.dumb_catan_v2_server.mapper.StringListConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="games")
@Data
@NoArgsConstructor
public class Game {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int gameId;

    @Column(name="owner")
    private String owner;

    @Lob
    @Convert(converter = ListOfStringListConverter.class)
    @Column(name="tileOrder")
    private List<List<String>> tileOrder;

    @Lob
    @Convert(converter = ListOfStringListConverter.class)
    @Column(name="diceIdOrder")
    private List<List<String>> diceIdOrder;

    @Lob
    @Convert(converter = StringListConverter.class)
    @Column(name="devCards")
    private List<String> devCards;

    @Column(name="robberLocation")
    private String robberLocation;

    @Column(name="longestRoad")
    private int longestRoad = 0;

    @Column(name="largestArmy")
    private int largestArmy = 0;

    @Column(name="longestRoadHolder")
    private String longestRoadHolder;

    @Column(name="largestArmyHolder")
    private String largestArmyHolder;

    @Convert(converter = StringListConverter.class)
    @Column(name="playerList")
    private List<String> playerList;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<Node> nodes;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<Road> roads;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<Player> players;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invite> invites;

    public void updatePlayerList(String player) {
        playerList.add(player);
    }

    public void addPlayer(Player player) {
        player.setGame(this);
        if (this.players == null) this.players = new ArrayList<>();
        this.players.add(player);
    }

    public void addInvite(Invite invite) {
        invite.setGame(this);
        if(this.invites == null) this.invites = new ArrayList<>();
        this.invites.add(invite);
    }

    public void removeInvite(Invite invite){
        this.invites.remove(invite);
    }

    public Game(int gameId, String owner, List<List<String>> tileOrder, List<List<String>> diceIdOrder, List<String> devCards, String robberLocation, int longestRoad, int largestArmy, String longestRoadHolder, String largestArmyHolder, List<Node> nodes, List<Road> roads, List<Player> players) {
        this.gameId = gameId;
        this.owner = owner;
        this.tileOrder = tileOrder;
        this.diceIdOrder = diceIdOrder;
        this.devCards = devCards;
        this.robberLocation = robberLocation;
        this.longestRoad = longestRoad;
        this.largestArmy = largestArmy;
        this.longestRoadHolder = longestRoadHolder;
        this.largestArmyHolder = largestArmyHolder;
        this.nodes = nodes;
        this.roads = roads;
        this.players = players;
    }

    public Game(String owner, List<List<String>> tileOrder, List<List<String>> diceIdOrder, List<String> devCards) {
        this.owner = owner;
        this.tileOrder = tileOrder;
        this.diceIdOrder = diceIdOrder;
        this.devCards = devCards;
    }

    public Game(CreateGameRequest newGameData, String owner) {
        this.owner = owner;
        this.tileOrder = newGameData.getTileOrder();
        this.diceIdOrder = newGameData.getDiceIdOrder();
        this.devCards = newGameData.getDevCards();
        this.playerList = new ArrayList<>(List.of(owner));
    }
}