package com.example.backend.Repositories;


import com.example.backend.Entities.Conversation;
import com.example.backend.Entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findAllByConversation(Conversation conversation);

    void deleteAllByConversation(Conversation conversation);
}
