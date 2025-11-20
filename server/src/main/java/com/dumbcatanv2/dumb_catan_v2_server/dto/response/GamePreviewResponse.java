package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;

import java.time.LocalDate;
import java.util.List;

public class GamePreviewResponse {
    private int gameId;
    private String owner;
    private List<String> playerList;
    private LocalDate lastUpdated = null;

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

    public List<String> getPlayers() {
        return playerList;
    }

    public void setPlayers(List<String> playerList) {
        this.playerList = playerList;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public GamePreviewResponse(int gameId, String owner, List<String> playerList) {
        this.gameId = gameId;
        this.owner = owner;
        this.playerList = playerList;
    }

    public GamePreviewResponse(Game g){
        this.gameId = g.getGameId();
        this.owner = g.getOwner();
        this.playerList = g.getPlayerList();
    }
}
