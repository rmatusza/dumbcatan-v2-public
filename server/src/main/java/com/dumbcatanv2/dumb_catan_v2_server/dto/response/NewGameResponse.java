package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

/* DTO for sending relevant info after creating a new game */
public class NewGameResponse {

    private int gameId;
    private PlayerResponse newPlayerData;

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public PlayerResponse getNewPlayerData() {
        return newPlayerData;
    }

    public void setNewPlayerData(PlayerResponse newPlayerData) {
        this.newPlayerData = newPlayerData;
    }

    public NewGameResponse(int gameId, PlayerResponse newPlayerData) {
        this.gameId = gameId;
        this.newPlayerData = newPlayerData;
    }

    public NewGameResponse(){}
}
