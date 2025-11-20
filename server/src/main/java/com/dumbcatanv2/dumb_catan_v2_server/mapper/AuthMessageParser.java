package com.dumbcatanv2.dumb_catan_v2_server.mapper;

import com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.request.WebsocketAuthRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Component;

@Component
public class AuthMessageParser {
    private final ObjectMapper objectMapper;

    public AuthMessageParser(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String extractTokenFromJson(String json) {
        try {
            WebsocketAuthRequest msg = objectMapper.readValue(json, WebsocketAuthRequest.class);
            return msg.getToken();

        } catch (Exception e) {
            throw new MessagingException("Malformed authentication message", e);
        }
    }
}
