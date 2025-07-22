package com.dumbcatanv2.dumb_catan_v2_server.entity;
import jakarta.persistence.*;

@Entity
@Table(name="nodes")
public class Node {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int nodeId;

    @Column(name="nodeNumber")
    private int nodeNumber;

    @Column(name="structure")
    private String structure;

    @Column(name="color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "gameId")
    private Game game;

    public int getNodeId() {
        return nodeId;
    }

    public void setNodeId(int nodeId) {
        this.nodeId = nodeId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
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

    public int getNodeNumber() {
        return nodeNumber;
    }

    public void setNodeNumber(int nodeNumber) {
        this.nodeNumber = nodeNumber;
    }

    public Node(int nodeId, String structure, String color, Game game, int nodeNumber) {
        this.nodeId = nodeId;
        this.structure = structure;
        this.color = color;
        this.game = game;
        this.nodeNumber = nodeNumber;
    }

    public Node(int nodeNumber, String structure, String color) {
        this.nodeNumber = nodeNumber;
        this.structure = structure;
        this.color = color;
    }

    public Node(){}
}