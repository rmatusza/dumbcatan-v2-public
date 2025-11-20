package com.dumbcatanv2.dumb_catan_v2_server.repo;

import com.dumbcatanv2.dumb_catan_v2_server.entity.User;
import com.dumbcatanv2.dumb_catan_v2_server.security.CustomUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<CustomUserDetails> findByUsername(String username);
    Optional<User> findUserByUsername(String username);
    Optional<User> findById(int id);
    boolean existsByUsername(String username);
}
