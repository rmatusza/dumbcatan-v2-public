package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.AuthRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.UserResponse;
import com.dumbcatanv2.dumb_catan_v2_server.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /*Authentication is automatically supplied as an argument by Spring Security if the JWT was valid*/
    /* -> Authentication can be added as a parameter to any method that you want this object to be supplied to*/
    /* -> as part of the filter chain defined in security config, there is the JwtAuthFilter that has been added to the chain*/
    /* -> this extracts the jwt and analyzes it via the JwtUtil class to complete authentication*/
    /*This is the endpoint that gets called when a user with an account lands on the site for the first time*/
    /* -> if they have a valid non-expired token they can skip logging in by being authenticated via this controller method*/
    /*NOTE: if an exception occurs in the filter, this method is never called, hence there's no need to handle exceptions here
    * as they are handled in the filter*/
    @GetMapping("/authenticate")
    public ResponseEntity<UserResponse> authenticate() {
        UserResponse userInfo = authService.authenticate();
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/signin")
    public ResponseEntity<UserResponse> signin(@Valid @RequestBody AuthRequest req) {
        UserResponse authResponse = authService.signin(req);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody AuthRequest req) {
        UserResponse authResponse = authService.signup(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }
}
