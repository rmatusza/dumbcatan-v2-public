package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.UserDataRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.UserResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import com.dumbcatanv2.dumb_catan_v2_server.entity.Player;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.NonUniqueUsernameException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
import com.dumbcatanv2.dumb_catan_v2_server.repo.GameRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.PlayerRepository;
import com.dumbcatanv2.dumb_catan_v2_server.repo.UserRepository;
import com.dumbcatanv2.dumb_catan_v2_server.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepo;
    @Autowired
    GameRepository gameRepo;
    @Autowired
    PlayerRepository playerRepo;
    @Autowired
    JwtUtil jwtUtil;

    @Transactional
    public UserResponse updateProfile(UserDataRequest req, int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RecordNotFoundException("User with ID: " + userId + " was not found"));
        String oldUsername = user.getUsername();
        String newUsername = req.getUsername();

        UserResponse updatedUserData = new UserResponse();

        if (!newUsername.equals("NONE")) {
            if(userRepo.existsByUsername(newUsername)) {
                throw new NonUniqueUsernameException("Username already exists");
            }

            // update username
            user.setUsername(newUsername);

            // get all active games for user
            List<Player> players = playerRepo.findByUser_UserId(userId);
            ArrayList<Integer> gameIds = new ArrayList<>();

            players.forEach(player -> {
                gameIds.add(player.getGame().getGameId());
            });

            List<Game> games = gameRepo.findAllByGameIdIn(gameIds);

            // update owner username with new username if necessary, and update player list
            for(var game : games) {
                if(game.getOwner().equals(oldUsername)) {
                    game.setOwner(newUsername);
                }

                game.getPlayerList().replaceAll(s -> s.equals(oldUsername) ? newUsername : s);
            }

            // create a new token based on the new username - ensures that token authentication continues to work
            String jwt = jwtUtil.generateToken(newUsername);
            updatedUserData.setUsername(newUsername);
            updatedUserData.setJWT(jwt);
        }

        if (!req.getAvatarURL().equals("NONE")) {
            user.setAvatarURL(req.getAvatarURL());
            updatedUserData.setAvatarURL(user.getAvatarURL());
        }

        if(!req.getPassword().equals("NONE")) {
            String newPassword = passwordEncoder.encode(req.getPassword());
            user.setPassword(newPassword);
        }

       return updatedUserData;
    }
}
