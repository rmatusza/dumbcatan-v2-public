package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.PlayerResponse;
import com.dumbcatanv2.dumb_catan_v2_server.security.CustomUserDetails;
import com.dumbcatanv2.dumb_catan_v2_server.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/data-for-game/{gameId}")
    public ResponseEntity<PlayerResponse> fetchPlayerData(@PathVariable int gameId, @AuthenticationPrincipal CustomUserDetails principal) {
        PlayerResponse res = playerService.fetchPlayer(principal.getUserId(), gameId);
        return ResponseEntity.ok(res);
    }
}
