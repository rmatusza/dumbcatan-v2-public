package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.UserDataRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.UserResponse;
import com.dumbcatanv2.dumb_catan_v2_server.security.CustomUserDetails;
import com.dumbcatanv2.dumb_catan_v2_server.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(@Valid @RequestBody UserDataRequest req, @AuthenticationPrincipal CustomUserDetails principal) {
        UserResponse res = userService.updateProfile(req, principal.getUserId());
        return ResponseEntity.ok(res);
    }
}
