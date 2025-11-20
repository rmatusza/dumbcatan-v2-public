package com.dumbcatanv2.dumb_catan_v2_server.websocket.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.GamePreviewResponse;
import com.dumbcatanv2.dumb_catan_v2_server.websocket.service.InviteServiceWS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
public class InviteControllerWS {

    @Autowired
    InviteServiceWS inviteService;

    @MessageMapping("/invite/{recipient}/to/game/{gameId}")
    @SendTo("/topic/invites/{recipient}")
    public GamePreviewResponse sendInvite(@DestinationVariable int gameId) {
        return inviteService.sendInvite(gameId);
    }

    @Scheduled(fixedRate = 5000) // every 5 seconds
    @SendTo("/topic/test-heartbeat")
    public String sendHeartbeat() {
        return "Server time: " + System.currentTimeMillis();
    }

}
