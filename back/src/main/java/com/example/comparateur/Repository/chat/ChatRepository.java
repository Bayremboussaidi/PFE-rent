package com.example.comparateur.Repository.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comparateur.Entity.chat.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    List<Chat> findByFirstUserEmail(String email);
    List<Chat> findBySecondUserEmail(String email);

    // Custom query for the OR condition
    @Query("SELECT c FROM Chat c WHERE c.firstUserEmail = :email OR c.secondUserEmail = :email")
    List<Chat> findByFirstUserEmailOrSecondUserEmail(@Param("email") String email);

    // Original directional method (optional if you replace it)
    List<Chat> findByFirstUserEmailAndSecondUserEmail(String firstUserEmail, String secondUserEmail);

    // ✅ New bi-directional query for chat between two users, order doesn't matter
    @Query("SELECT c FROM Chat c WHERE (c.firstUserEmail = :email1 AND c.secondUserEmail = :email2) OR (c.firstUserEmail = :email2 AND c.secondUserEmail = :email1)")
    List<Chat> findChatByEmailsBidirectional(@Param("email1") String email1, @Param("email2") String email2);
}
