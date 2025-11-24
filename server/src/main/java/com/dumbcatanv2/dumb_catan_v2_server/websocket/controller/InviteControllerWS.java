package com.dumbcatanv2.dumb_catan_v2_server.websocket.controller;

import com.dumbcatanv2.dumb_catan_v2_server.service.InviteService;
import com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.response.InviteMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class InviteControllerWS {

    private final InviteService inviteService;

    @MessageMapping("/invite/{recipient}/to/game/{gameId}")
    @SendTo("/topic/invites/to/{recipient}")
    public InviteMessage sendInvite(@DestinationVariable int gameId) {
        return new InviteMessage(gameId);
    }

    @MessageMapping("/invite/to/game/{gameId}/from/{owner}/to/{recipient}/accepted")
    @SendTo("/topic/invites/from/{owner}")
    public InviteMessage acceptInvite(@DestinationVariable String owner, @DestinationVariable int gameId, @DestinationVariable String recipient) {
        return new InviteMessage(gameId, recipient);
    }

    @Scheduled(fixedRate = 5000) // every 5 seconds
    @SendTo("/topic/test-heartbeat")
    public String sendHeartbeat() {
        return "Server time: " + System.currentTimeMillis();
    }

}
