package com.dumbcatanv2.dumb_catan_v2_server.websocket;

import com.dumbcatanv2.dumb_catan_v2_server.websocket.security.AuthHandshakeInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private AuthHandshakeInterceptor authHandshakeInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/dumb-catan-ws")
               .setAllowedOriginPatterns("*")
//               .addInterceptors(authHandshakeInterceptor)
               .withSockJS(); /* Optional: fallback for browsers without WebSocket */
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); /* what broker sends to client */
        registry.setApplicationDestinationPrefixes("/dumb-catan-ws"); /* what client sends to server */
    }

}