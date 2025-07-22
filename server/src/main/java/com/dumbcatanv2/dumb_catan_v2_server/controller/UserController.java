package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.UserDataRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.UserResponse;
import com.dumbcatanv2.dumb_catan_v2_server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateProfile(@Valid @RequestBody UserDataRequest req, @PathVariable int userId) {
        UserResponse res = userService.updateProfile(req, userId);
        return ResponseEntity.ok(res);
    }
}
