package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Invite;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class InviteResponse {
    private List<InviteSummary> inviteSummaries = new ArrayList<>();

    public static InviteResponse createInvitesList(List<Game> games, List<Invite> invites){
        InviteResponse inviteResponse = new InviteResponse();

        for(int i=0; i<games.size(); i++){
            Game game = games.get(i);
            Invite invite = invites.get(i);

            inviteResponse.getInviteSummaries().add(new InviteSummary(game, invite));
        }

        return inviteResponse;
    }
}
