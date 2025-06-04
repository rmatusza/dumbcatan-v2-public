package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.UserDataRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.UserDataResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.InvalidSignupException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.UserIdNotFound;
import com.dumbcatanv2.dumb_catan_v2_server.repo.UserRepository;
import com.dumbcatanv2.dumb_catan_v2_server.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepo;
    @Autowired
    JwtUtil jwtUtil;

    @Transactional
    public UserDataResponse updateProfile(UserDataRequest req) {
        User user = userRepo.findById(req.getUserID())
                .orElseThrow(() -> new UserIdNotFound("User with ID: " + req.getUserID() + " was not found"));

        UserDataResponse updatedUserData = new UserDataResponse();

        if (!req.getUsername().equals("NONE")) {
            if(userRepo.existsByUsername(req.getUsername())) {
                throw new InvalidSignupException("Username already exists");
            }
            user.setUsername(req.getUsername());
            String jwt = jwtUtil.generateToken(user.getUsername());
            updatedUserData.setUsername(user.getUsername());
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
