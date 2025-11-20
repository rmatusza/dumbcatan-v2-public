package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.PlayerResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Player;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    PlayerRepository playerRepo;

    public PlayerResponse fetchPlayer(int userId, int gameId) {
        Optional<Player> playerOptional = playerRepo.findByUserIdAndGameId(userId, gameId);
        if(playerOptional.isEmpty()){
            throw new RecordNotFoundException("No player was found matching the provided IDs");
        }
        return new PlayerResponse(playerOptional.get());
    }
}
