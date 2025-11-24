package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Invite;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class InviteSummary {
    private int gameId;
    private String owner;
    private List<String> playerList;
    private LocalDate lastUpdated = null;
    private int inviteId;

    public InviteSummary(Game g, Invite i){
        this.gameId = g.getGameId();
        this.owner = g.getOwner();
        this.playerList = g.getPlayerList();
        this.inviteId = i.getInviteId();
    }
}
