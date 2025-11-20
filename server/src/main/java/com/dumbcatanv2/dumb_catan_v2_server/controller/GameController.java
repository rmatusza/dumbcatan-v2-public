package com.dumbcatanv2.dumb_catan_v2_server.controller;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateGameRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.GameResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.NewGameResponse;
import com.dumbcatanv2.dumb_catan_v2_server.service.GameService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    GameService gameService;

    @PostMapping
    public ResponseEntity<NewGameResponse> createNewGame(@Valid @RequestBody CreateGameRequest newGameData) {
        NewGameResponse res = gameService.saveNewGame(newGameData);
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public ResponseEntity<List<GameResponse>> fetchActiveGames(@RequestParam int userId) {
        List<GameResponse> res = gameService.fetchActiveGames(userId);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<ApiResponse> deleteGame(@PathVariable int gameId, @RequestParam int userId) {
        ApiResponse res = gameService.deleteGame(gameId, userId);
        return ResponseEntity.ok(res);
    }
}
