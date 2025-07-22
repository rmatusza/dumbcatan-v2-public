package com.dumbcatanv2.dumb_catan_v2_server.repo;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    /* returns all player objects for a given user */
    List<Player> findByUser_UserId(int userId);

    @Query("SELECT p FROM Player p WHERE p.user.userId = :userId AND p.game.gameId = :gameId")
    Optional<Player> findByUserIdAndGameId(@Param("userId") int userId, @Param("gameId") int gameId);

}
