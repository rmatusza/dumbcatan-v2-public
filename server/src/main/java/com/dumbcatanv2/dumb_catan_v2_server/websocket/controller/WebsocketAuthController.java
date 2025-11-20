package com.dumbcatanv2.dumb_catan_v2_server.websocket.controller;

import com.dumbcatanv2.dumb_catan_v2_server.util.AuthMessageParser;
import com.dumbcatanv2.dumb_catan_v2_server.security.JwtAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class WebsocketAuthController {

    @Autowired
    private JwtAuthenticator jwtAuthenticator;
    @Autowired
    private AuthMessageParser authMessageParser;

    @MessageMapping("/authenticate")
    public void authenticateWebsocketConnection(Message<String> message, SimpMessageHeaderAccessor accessor) {
        String json = message.getPayload();

        // Extract token from payload (you could also use a DTO)
        String token = authMessageParser.extractTokenFromJson(json); // e.g., use Jackson or manual parsing

        var auth = jwtAuthenticator.authenticate("Bearer " + token);

        if (auth != null) {
            System.out.println("✅ Authenticated WebSocket user: " + auth.getName());
            accessor.setUser(auth); // Set user for future messages
            // optionally mark the session as authenticated using session attributes - TO LOOK INTO LATER
        } else {
            System.out.println("❌ Invalid token — disconnecting user");
            // Close connection (Spring doesn't have a built-in disconnect method here, so use messaging template)
            throw new MessagingException("Invalid JWT — session closed");
        }
    }
}
