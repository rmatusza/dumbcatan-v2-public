package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.AuthRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.UserResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.NonUniqueUsernameException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.UserRepository;
import com.dumbcatanv2.dumb_catan_v2_server.security.CustomUserDetails;
import com.dumbcatanv2.dumb_catan_v2_server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    UserRepository userRepo;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    /*NOTE: JwtAuthFilter handles the event in which jwt is either invalid or expired, so we don't have to handle
    * exceptions here */
    public UserResponse authenticate(Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        return new UserResponse(
                userDetails.getUserId(),
                userDetails.getUsername(),
                userDetails.getRole(),
                userDetails.getAvatarURL(),
                userDetails.getActiveGames()
        );
    }

    public UserResponse signin(AuthRequest req) {

        /*Spring Security will throw a variety of potential exceptions that are caught below if authenticate() fails*/
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(userDetails.getUsername());



        return new UserResponse(
                userDetails.getUserId(),
                userDetails.getUsername(),
                userDetails.getRole(),
                userDetails.getAvatarURL(),
                userDetails.getActiveGames(),
                jwt
        );
    }

    public UserResponse signup(AuthRequest req) {

        if(userRepo.existsByUsername(req.getUsername())) {
            throw new NonUniqueUsernameException("Username already exists");
        }

        User user = new User(req.getUsername(), passwordEncoder.encode(req.getPassword()));

        User newUser = userRepo.save(user);
        String jwt = jwtUtil.generateToken(newUser.getUsername());

        return new UserResponse(
                newUser.getUserId(),
                newUser.getUsername(),
                newUser.getRole(),
                newUser.getAvatarURL(),
                newUser.getActiveGames(),
                jwt
        );
    }
}
