package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotNull;

/* DTO for adding a node */
// gameId provided as a path variable
// nodeId is auto generated
public class CreateNodeRequest {
    @NotNull
    private int nodeNumber;

    @NotNull
    private String structure;

    @NotNull
    private String color;

    public int getNodeNumber() {
        return nodeNumber;
    }

    public void setNodeNumber(int nodeNumber) {
        this.nodeNumber = nodeNumber;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public CreateNodeRequest(int nodeNumber, String structure, String color) {
        this.nodeNumber = nodeNumber;
        this.structure = structure;
        this.color = color;
    }
}
