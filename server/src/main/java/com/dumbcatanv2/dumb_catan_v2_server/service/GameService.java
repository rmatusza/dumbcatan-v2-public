package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.GameResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.PlayerResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateGameRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.NewGameResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Player;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.MaxActiveGamesExceededException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.GameRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.PlayerRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    GameRepository gameRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    PlayerRepository playerRepo;

    @Transactional
    public NewGameResponse saveNewGame(CreateGameRequest newGameData) {
        Optional<User> optionalUser = userRepo.findById(newGameData.getOwnerId());
        User user;
        if(optionalUser.isPresent()){
            user = optionalUser.get();

            if(user.getActiveGames() == 3) {
                throw new MaxActiveGamesExceededException("No more than 3 active games are allowed at once");
            }
        }
        else {
            throw new RecordNotFoundException("user with id " + newGameData.getOwnerId() + " was not found");
        }

        Player newPlayer = Player.createInitial();
        newPlayer.setColor(newGameData.getColor());
        Game newGame = new Game(newGameData);

        user.addPlayer(newPlayer);
        user.setActiveGames(user.getActiveGames() + 1);
        newGame.addPlayer(newPlayer);

        Game savedGame = gameRepo.save(newGame);

        return new NewGameResponse(savedGame.getGameId(), new PlayerResponse(newPlayer));
    }

    public List<GameResponse> fetchActiveGames(int userId) {
        List<Player> players = playerRepo.findByUser_UserId(userId);
        ArrayList<Integer> gameIds = new ArrayList<>();

        players.forEach(player -> {
            gameIds.add(player.getGame().getGameId());
        });

        List<Game> games = gameRepo.findAllByGameIdIn(gameIds);

        return games.stream().map(GameResponse::new).toList();
    }

    @Transactional
    public ApiResponse deleteGame(int gameId, int userId) {
        Optional<User> optionalUser = userRepo.findById(userId);
        if(optionalUser.isEmpty()) {
            throw new RecordNotFoundException("User with id " + userId + " not found");
        }
        User user = optionalUser.get();
        user.setActiveGames(user.getActiveGames() - 1 );
        gameRepo.deleteById(gameId);

        return new ApiResponse(true, "Game " + gameId + " deleted", 200, null);
    }
}