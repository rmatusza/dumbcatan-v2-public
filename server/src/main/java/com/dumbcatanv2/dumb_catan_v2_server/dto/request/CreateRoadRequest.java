package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotNull;

/* DTO for adding a road */
// gameId provided as a path variable
// roadId is auto generated
public class CreateRoadRequest {
    @NotNull
    private int roadNumber;

    @NotNull
    private String color;

    public int getId() {
        return roadNumber;
    }

    public void setId(int roadNumber) {
        this.roadNumber = roadNumber;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public CreateRoadRequest(int roadNumber, String color) {
        this.roadNumber = roadNumber;
        this.color = color;
    }
}
