package com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InviteMessage {
    private int gameId;
    private String playerName;

    public InviteMessage(int gameId) {
        this.gameId = gameId;
    }
}
