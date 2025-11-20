package com.dumbcatanv2.dumb_catan_v2_server.websocket.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.GamePreviewResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InviteServiceWS {

    @Autowired
    GameRepository gameRepo;

    public GamePreviewResponse sendInvite(int gameId) {
        Optional<Game> game = gameRepo.findByGameId(gameId);

        if(game.isPresent()){
            return new GamePreviewResponse(game.get());
        }

        throw new RecordNotFoundException("Game: " + gameId + " not found");
    }
}