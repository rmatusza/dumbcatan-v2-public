package com.dumbcatanv2.dumb_catan_v2_server.service;

import com.dumbcatanv2.dumb_catan_v2_server.dto.request.UserDataRequest;
import com.dumbcatanv2.dumb_catan_v2_server.dto.response.UserResponse;
import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.NonUniqueUsernameException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.RecordNotFoundException;
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
    public UserResponse updateProfile(UserDataRequest req, int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RecordNotFoundException("User with ID: " + userId + " was not found"));

        UserResponse updatedUserData = new UserResponse();

        if (!req.getUsername().equals("NONE")) {
            if(userRepo.existsByUsername(req.getUsername())) {
                throw new NonUniqueUsernameException("Username already exists");
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
