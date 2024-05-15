package com.example.backend.dto;


import com.example.backend.Services.MessageSocketService;
import com.example.backend.dto.MessageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;


@RequiredArgsConstructor
@Controller
public class MessageSocketController {
    private final MessageSocketService socketService;


    @MessageMapping("/user")
    public void sendUserConversationByUserId(int userId) {
        socketService.sendUserConversationByUserId(userId);
    }


    @MessageMapping("/conv")
    public void sendMessagesByConversationId(int conversationId) {
        socketService.sendMessagesByConversationId(conversationId);
    }


    @MessageMapping("/sendMessage")
    public void saveMessage(MessageRequest message) {
        socketService.saveMessage(message);
    }


    @MessageMapping("/deleteConversation")
    public void deleteConversation(Map<String, Object> payload) {
        int conversationId = (int) payload.get("conversationId");
        int user1 = (int) payload.get("user1Id");
        int user2 = (int) payload.get("user2Id");
        socketService.deleteConversationByConversationId(conversationId);
        socketService.sendUserConversationByUserId(user1);
        socketService.sendUserConversationByUserId(user2);
    }


    @MessageMapping("/deleteMessage")
    public void deleteMessage(Map<String, Object> payload) {
        int conversationId = (int) payload.get("conversationId");
        int messageId = (int) payload.get("messageId");
        socketService.deleteMessageByMessageId(conversationId, messageId);
    }
}
