package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Road;
import java.util.List;

public class RoadResponse {

    List<Road> roads;

    public List<Road> getRoads() {
        return roads;
    }

    public void setRoads(List<Road> roads) {
        this.roads = roads;
    }

    public void addRoad(Road newRoad) {
        roads.add(newRoad);
    }

    public RoadResponse(List<Road> roads) {
        this.roads = roads;
    }

    public RoadResponse(){};
}
