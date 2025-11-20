package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateGameRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.GameResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.NewGameResponse;
import com.dumbcatanv2.dumb_catan_v2_server.security.CustomUserDetails;
import com.dumbcatanv2.dumb_catan_v2_server.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping
    public ResponseEntity<NewGameResponse> createNewGame(@Valid @RequestBody CreateGameRequest newGameData, @AuthenticationPrincipal CustomUserDetails principal) {
        NewGameResponse res = gameService.saveNewGame(newGameData, principal.getUserId(), principal.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping
    public ResponseEntity<List<GameResponse>> fetchActiveGames(@AuthenticationPrincipal CustomUserDetails principal) {
        List<GameResponse> res = gameService.fetchActiveGames(principal.getUserId());
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Void> deleteGame(@PathVariable int gameId, @AuthenticationPrincipal CustomUserDetails principal) {
        gameService.deleteGame(gameId, principal.getUserId());
        return ResponseEntity.noContent().build();
    }
}