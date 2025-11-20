package com.dumbcatanv2.dumb_catan_v2_server.websocket.security;

import com.dumbcatanv2.dumb_catan_v2_server.security.JwtAuthenticator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class AuthHandshakeInterceptor implements HandshakeInterceptor {
    @Autowired
    private JwtAuthenticator jwtAuthenticator;

    /* - before handshake only runs once when the connection is first opened */
    /* - if handshake successful ( jwt is valid ) user info is injected into the ws session */
    /* - because the ws creates a session, only need to validate the jwt once on connection */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {

        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpReq = servletRequest.getServletRequest();
            String token = httpReq.getParameter("token");

            if (token != null && token.startsWith("Bearer ")) {
                UsernamePasswordAuthenticationToken auth = jwtAuthenticator.authenticate(token);
                if (auth != null) {
                    attributes.put("username", auth.getName());
                    return true;
                } else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}