package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateInviteRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.InviteResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Invite;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Player;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.DuplicateInviteException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.GameRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.InviteRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.PlayerRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InviteService {
    @Autowired
    private InviteRepository inviteRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private GameRepository gameRepo;
    @Autowired
    private PlayerRepository playerRepo;

    @Transactional
    public ApiResponse createInvite(CreateInviteRequest req) {
        Optional<User> user = userRepo.findUserByUsername(req.getRecipientUsername());
        Optional<Game> game = gameRepo.findByGameId(req.getGameId());

        if(user.isEmpty()) throw new RecordNotFoundException("User: " + req.getRecipientUsername() + " was not found");
        if(game.isEmpty()) throw new RecordNotFoundException("Game: " + req.getGameId() + " was not found");

        Optional<Invite> invite = inviteRepo.findByUserIdAndGameId(user.get().getUserId(), game.get().getGameId());

        if(invite.isPresent()) throw new DuplicateInviteException("An invite has already been sent to this user and is pending");

        if(game.get().getPlayerList().contains(user.get().getUsername())) throw new IllegalArgumentException(user.get().getUsername() + " is already a member of this game");

        Invite newInvite = new Invite(game.get(), user.get());

        inviteRepo.save(newInvite);

        game.get().addInvite(newInvite);
        user.get().addInvite(newInvite);

        return new ApiResponse("New invite created");
    }

    @Transactional
    public void accept(int inviteId, int userId, String playerColor){
        Set<String> colors = new HashSet<>(List.of("red", "blue", "white", "orange"));
        if(!colors.contains(playerColor)) throw new IllegalArgumentException("Player color must be one of the following: red, blue, white, orange");

        Optional<Invite> invite = inviteRepo.findById(inviteId);
        if(invite.isEmpty()) throw new RecordNotFoundException("Invite: " + inviteId + " was not found");

        int gameId = invite.get().getGame().getGameId();

        Optional<Game> game = gameRepo.findByGameId(gameId);
        if(game.isEmpty()) throw new RecordNotFoundException("Game: " + gameId + " was not found");

        List<Player> players = playerRepo.findAllByGameGameId(gameId);
        players.forEach(p -> {
            if(p.getPlayerId() != userId && p.getColor().equalsIgnoreCase(playerColor)) throw new IllegalArgumentException(playerColor + " is reserved by another player");
        });

        Optional<User> user = userRepo.findById(userId);
        if(user.isEmpty()) throw new RecordNotFoundException("User: " + userId + " was not found");

        Player newPlayer = Player.createInitial();
        newPlayer.setColor(playerColor);
        game.get().addPlayer(newPlayer);
        game.get().getPlayerList().add(user.get().getUsername());
        user.get().addPlayer(newPlayer);

        user.get().removeInvite(invite.get());
        game.get().removeInvite(invite.get());
    }

    public void decline(int inviteId){
        inviteRepo.deleteById(inviteId);
    }

    public InviteResponse fetchAll(int userId){
        List<Invite> invites = inviteRepo.findByUserUserId(userId);

        if(invites.isEmpty()) return new InviteResponse();

        List<Integer> gameIds = invites.stream().map(i -> i.getGame().getGameId()).toList();
        List<Game> games = gameRepo.findAllByGameIdIn(gameIds);

        if(games.isEmpty()) throw new RecordNotFoundException("Game ids from fetched invites have no associated game record");
        if(games.size() != invites.size()) throw new RecordNotFoundException("One or more game ids from fetched invites have no associated game record");

        games.sort(Comparator.comparingInt(Game::getGameId));
        invites.sort(Comparator.comparingInt(i -> i.getGame().getGameId()));

        return InviteResponse.createInvitesList(games, invites);
    }

    public InviteResponse fetchOne(int gameId, int userId){
        Optional<Invite> invite = inviteRepo.findByUserIdAndGameId(userId, gameId);

        if(invite.isEmpty()) throw new RecordNotFoundException("No invites to user: " + userId + " for game: " + gameId + " were found");

        Optional<Game> game = gameRepo.findByGameId(gameId);

        if(game.isEmpty()) throw new RecordNotFoundException("Game: " + gameId + " was not found");

        return InviteResponse.createInvitesList(List.of(game.get()), List.of(invite.get()));
    }
}
