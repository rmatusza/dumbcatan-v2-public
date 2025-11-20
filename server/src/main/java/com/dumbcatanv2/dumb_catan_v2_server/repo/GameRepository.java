package com.dumbcatanv2.dumb_catan_v2_server.repo;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
    List<Game> findAllByGameIdIn(List<Integer> gameIds);
    Optional<Game> findByGameId(int gameId);
}
