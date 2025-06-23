package com.dumbcatanv2.dumb_catan_v2_server.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

/*Class for creating a JWT filter that is added to the filter chain in the security config class*/
/* -> this filter allows a user's request to be allowed or not depending on the client provided jwt in the header*/
/* -> if jwt is valid and not expired then the request is allowed and moves to the next part of the filter chain if one exists*/
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        /*accessing token and extracting username from it*/
        final String authHeader = request.getHeader("Authorization");

        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        /*SecurityContextHolder.getContext() gets the current thread’s security context, which holds information about the currently authenticated user (if any)*/
        /* -> returns the Authentication object - contains users identity, credentials, authorities, and whether they are authenticated - which if they are not null will be returned*/
        /* -> checks to make sure that 1) a username was extracted from the jwt and 2) user is not already authenticated*/
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            /*here we verify that the jwt is 1) properly signed / not tampered with 2) not expired, and 3) still valid for the user */
            if (jwtUtil.validateToken(jwt)) {
                /*fetches user from database using the username which returns a UserDetails object*/
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                /*creates an authentication object for spring security - object says user is logged in and has the following roles (specified by the getAuthorities() method)*/
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                /*Adds web-specific metadata to the auth object (like IP address, session ID)*/
                /*Optional but useful for logging or auditing.*/
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                /*tells spring security that this user is now authenticated for this request*/
                /*NOTE: From this point on, any part of the app (e.g., controllers) can access the user via - Authentication auth = SecurityContextHolder.getContext().getAuthentication();*/
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        /*Passes control to the next filter in the chain (or to the controller method if this is the last filter)*/
        /*NOTE: Must be called, or the request stops here*/
        filterChain.doFilter(request, response);
    }
}