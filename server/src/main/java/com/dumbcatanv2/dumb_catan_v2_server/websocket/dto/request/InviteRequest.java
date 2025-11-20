package com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.request;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;

import java.util.List;

public class InviteRequest {
    private String owner;
    private int gameId;
    private List<String> playerList;

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public List<String> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(List<String> playerList) {
        this.playerList = playerList;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public InviteRequest(int gameId, String owner, List<String> playerList) {
        this.gameId = gameId;
        this.owner = owner;
        this.playerList = playerList;
    }

    public InviteRequest(Game game) {
        this.gameId = game.getGameId();
        this.playerList = game.getPlayerList();
        this.owner = game.getOwner();
    }

    public InviteRequest(){}
}
