package com.dumbcatanv2.dumb_catan_v2_server.security;

import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtAuthenticator {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthenticator(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    public UsernamePasswordAuthenticationToken authenticate(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            String username = jwtUtil.extractUsername(jwt);

            /* here we verify that the jwt is 1) properly signed / not tampered with 2) not expired, and 3) still valid for the user */
            if (username != null && jwtUtil.validateToken(jwt)) {

                /*fetches user from database using the username which returns a UserDetails object*/
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                /*creates an authentication object for spring security - object says user is logged in and has the following roles (specified by the getAuthorities() method)*/
                return new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
            }
        }

        throw new JwtException("Invalid JWT");
    }
}
