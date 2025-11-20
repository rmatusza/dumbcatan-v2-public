package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Node;

import java.util.List;

public class NodeResponse {

    List<Node> nodes;

    public List<Node> getNodes() {
        return nodes;
    }

    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }

    public void addNode(Node newNode) {
        nodes.add(newNode);
    }

    public NodeResponse(List<Node> nodes) {
        this.nodes = nodes;
    }

    public NodeResponse(){};
}
