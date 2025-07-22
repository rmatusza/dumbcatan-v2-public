package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Node;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Road;

import java.util.List;

/* DTO for sending game details */
public class GameResponse {

    private int gameId;

    private List<Node> nodeData;

    private List<Road> roadData;

    private String owner;

    private String robberLocation;

    private List<String> playerList;

    private List<List<String>> tileOrder;

    private List<List<String>> diceIdOrder;

    private List<String> devCards;

    private int longestRoad;

    private int largestArmy;

    private String longestRoadHolder;

    private String largestArmyHolder;

    public List<String> getDevCards() {
        return devCards;
    }

    public void setDevCards(List<String> devCards) {
        this.devCards = devCards;
    }

    public List<List<String>> getDiceIdOrder() {
        return diceIdOrder;
    }

    public void setDiceIdOrder(List<List<String>> diceIdOrder) {
        this.diceIdOrder = diceIdOrder;
    }

    public List<List<String>> getTileOrder() {
        return tileOrder;
    }

    public void setTileOrder(List<List<String>> tileOrder) {
        this.tileOrder = tileOrder;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getRobberLocation() {
        return robberLocation;
    }

    public void setRobberLocation(String robberLocation) {
        this.robberLocation = robberLocation;
    }

    public List<String> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(List<String> playerList) {
        this.playerList = playerList;
    }

    public int getLongestRoad() {
        return longestRoad;
    }

    public void setLongestRoad(int longestRoad) {
        this.longestRoad = longestRoad;
    }

    public int getLargestArmy() {
        return largestArmy;
    }

    public void setLargestArmy(int largestArmy) {
        this.largestArmy = largestArmy;
    }

    public String getLongestRoadHolder() {
        return longestRoadHolder;
    }

    public void setLongestRoadHolder(String longestRoadHolder) {
        this.longestRoadHolder = longestRoadHolder;
    }

    public String getLargestArmyHolder() {
        return largestArmyHolder;
    }

    public void setLargestArmyHolder(String largestArmyHolder) {
        this.largestArmyHolder = largestArmyHolder;
    }

    public List<Node> getNodeData() {
        return nodeData;
    }

    public void setNodeData(List<Node> nodeData) {
        this.nodeData = nodeData;
    }

    public List<Road> getRoadData() {
        return roadData;
    }

    public void setRoadData(List<Road> roadData) {
        this.roadData = roadData;
    }

    public GameResponse(Game game) {
        this.gameId = game.getGameId();
        this.nodeData = game.getNodes();
        this.roadData = game.getRoads();
        this.owner = game.getOwner();
        this.tileOrder = game.getTileOrder();
        this.diceIdOrder = game.getDiceIdOrder();
        this.devCards = game.getDevCards();
        this.robberLocation = game.getRobberLocation();
        this.playerList = game.getPlayerList();
        this.largestArmy = game.getLargestArmy();
        this.longestRoad = game.getLongestRoad();
        this.largestArmyHolder = game.getLargestArmyHolder();
        this.longestRoadHolder = game.getLongestRoadHolder();
    }

    public GameResponse(){};
}
