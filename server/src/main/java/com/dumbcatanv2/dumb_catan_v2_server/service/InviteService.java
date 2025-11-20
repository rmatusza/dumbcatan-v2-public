package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.CreateInviteRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Invite;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.DuplicateInviteException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.GameRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.InviteRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InviteService {
    @Autowired
    private InviteRepository inviteRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private GameRepository gameRepo;

    @Transactional
    public ApiResponse createInvite(CreateInviteRequest req) {
        Optional<User> user = userRepo.findUserByUsername(req.getRecipientUsername());
        Optional<Game> game = gameRepo.findByGameId(req.getGameId());

        if(user.isEmpty()){
            throw new RecordNotFoundException("User: " + req.getRecipientUsername() + " was not found");
        }
        if(game.isEmpty()){
            throw new RecordNotFoundException("Game: " + req.getGameId() + " was not found");
        }

        Optional<Invite> invite = inviteRepo.findByUserIdAndGameId(user.get().getUserId(), game.get().getGameId());

        if(invite.isPresent()){
            throw new DuplicateInviteException("An invite has already been sent to this user and is pending");
        }

        Invite newInvite = new Invite(game.get(), user.get());

        inviteRepo.save(newInvite);

        game.get().addInvite(newInvite);
        user.get().addInvite(newInvite);

        return new ApiResponse("New invite created");
    }

}
