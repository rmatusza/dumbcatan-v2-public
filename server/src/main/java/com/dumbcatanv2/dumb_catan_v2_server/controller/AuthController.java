package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.AuthResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.AuthRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.UserDataResponse;
import com.dumbcatanv2.dumb_catan_v2_server.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @GetMapping("/authenticate")
    public ResponseEntity<UserDataResponse> authenticate(Authentication authentication) {
        UserDataResponse userInfo = authService.authenticate(authentication);
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@Valid @RequestBody AuthRequest req) {
        AuthResponse authResponse = authService.signin(req);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody AuthRequest req) {
        AuthResponse authResponse = authService.signup(req);
        return ResponseEntity.ok(authResponse);
    }
}
