package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

/* DTO for create game requests */
public class CreateGameRequest {

    @NotNull
    private String owner;

    @NotNull
    private List<List<String>> tileOrder;

    @NotNull
    private List<List<String>> diceIdOrder;

    @NotNull
    private List<String> devCards;

    @NotNull
    private int ownerId;

    @NotNull
    private String color;

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<List<String>> getTileOrder() {
        return tileOrder;
    }

    public void setTileOrder(List<List<String>> tileOrder) {
        this.tileOrder = tileOrder;
    }

    public List<List<String>> getDiceIdOrder() {
        return diceIdOrder;
    }

    public void setDiceIdOrder(List<List<String>> diceIdOrder) {
        this.diceIdOrder = diceIdOrder;
    }

    public List<String> getDevCards() {
        return devCards;
    }

    public void setDevCards(List<String> devCards) {
        this.devCards = devCards;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public CreateGameRequest(String owner, int ownerId, List<List<String>> tileOrder, List<List<String>> diceIdOrder, List<String> devCards, String color) {
        this.owner = owner;
        this.ownerId = ownerId;
        this.tileOrder = tileOrder;
        this.diceIdOrder = diceIdOrder;
        this.devCards = devCards;
        this.color = color;
    }

    public CreateGameRequest(){}
}
