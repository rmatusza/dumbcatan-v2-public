package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Player;
import java.util.List;

public class PlayerResponse {
    private List<String> resourceCards;
    private List<String> playableDevCards;
    private List<String> unplayableDevCards;
    private int[] startingNodes = new int[2];
    private int armySize;
    private int points;
    private String color;

    public int getArmySize() {
        return armySize;
    }

    public void setArmySize(int armySize) {
        this.armySize = armySize;
    }

    public List<String> getPlayableDevCards() {
        return playableDevCards;
    }

    public void setPlayableDevCards(List<String> playableDevCards) {
        this.playableDevCards = playableDevCards;
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public PlayerResponse(Player player) {
        this.resourceCards = player.getResourceCards();
        this.playableDevCards = player.getPlayableDevCards();
        this.unplayableDevCards = player.getUnplayableDevCards();
        this.startingNodes = player.getStartingNodes();
        this.armySize = player.getArmySize();
        this.points = player.getPoints();
        this.color = player.getColor();
    }

    public PlayerResponse(){}
}
