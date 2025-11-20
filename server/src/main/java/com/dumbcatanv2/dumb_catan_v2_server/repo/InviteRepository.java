package com.dumbcatanv2.dumb_catan_v2_server.repo;

import com.dumbcatanv2.dumb_catan_v2_server.entity.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface InviteRepository extends JpaRepository<Invite, Integer> {
    @Query("SELECT i FROM Invite i WHERE i.user.userId = :userId AND i.game.gameId = :gameId")
    Optional<Invite> findByUserIdAndGameId(@Param("userId") int userId, @Param("gameId") int gameId);
}
