package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.PlayerResponse;
import com.dumbcatanv2.dumb_catan_v2_server.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @GetMapping
    public ResponseEntity<PlayerResponse> fetchPlayerData(@RequestParam int userId, @RequestParam int gameId) {
        PlayerResponse res = playerService.fetchPlayer(userId, gameId);
        return ResponseEntity.ok(res);
    }
}
