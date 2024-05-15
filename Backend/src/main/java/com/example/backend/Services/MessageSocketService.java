package com.example.backend.Services;

import com.example.backend.Entities.Conversation;
import com.example.backend.Entities.Message;
import com.example.backend.Entities.User;
import com.example.backend.Repositories.ConversationRepository;
import com.example.backend.Repositories.MessageRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.dto.ConversationResponse;
import com.example.backend.dto.MessageRequest;
import com.example.backend.dto.MessageResponse;
import com.example.backend.dto.WebSocketResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.ZoneId;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MessageSocketService  {


    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;



    public void sendUserConversationByUserId(int userId) {
        List<ConversationResponse> conversation = conversationRepository.findConversationsByUserId(userId);
        messagingTemplate.convertAndSend(
                "/topic/user/".concat(String.valueOf(userId)),
                WebSocketResponse.builder()
                        .type("ALL")
                        .data(conversation)
                        .build()
        );
    }



    public void sendMessagesByConversationId(int conversationId) {
        Conversation conversation = new Conversation();
        conversation.setConversationId(conversationId);
        List<Message> messageList = messageRepository.findAllByConversation(conversation);
        List<MessageResponse> messageResponseList = messageList.stream()
                .map((message -> MessageResponse.builder()
                        .messageId(message.getMessageId())
                        .message(message.getMessage())
                        .timestamp(Date.from(message.getTimestamp().atZone(ZoneId.systemDefault()).toInstant()))
                        .senderId(message.getSender().getUserId())
                        .receiverId(message.getReceiver().getUserId())
                        .build())
                ).toList();
        messagingTemplate.convertAndSend("/topic/conv/".concat(String.valueOf(conversationId)), WebSocketResponse.builder()
                .type("ALL")
                .data(messageResponseList)
                .build()
        );
    }



    public void saveMessage(MessageRequest msg) {
        User sender = userRepository.findById(msg.getSenderId()).get();
        User receiver = userRepository.findById(msg.getReceiverId()).get();
        Conversation conversation = conversationRepository.findConversationByUsers(sender, receiver).get();
        Message newMessage = new Message();
        newMessage.setMessage(msg.getMessage());
        newMessage.setTimestamp(msg.getTimestamp());
        newMessage.setConversation(conversation);
        newMessage.setSender(sender);
        newMessage.setReceiver(receiver);
        Message savedMessage = messageRepository.save(newMessage);
        // notify listener
        MessageResponse res = MessageResponse.builder()
                .messageId(savedMessage.getMessageId())
                .message(savedMessage.getMessage())
                .timestamp(Date.from(savedMessage.getTimestamp().atZone(ZoneId.systemDefault()).toInstant()))
                .senderId(savedMessage.getSender().getUserId())
                .receiverId(savedMessage.getReceiver().getUserId())
                .build();
        messagingTemplate.convertAndSend("/topic/conv/".concat(msg.getConversationId().toString()),
                WebSocketResponse.builder()
                        .type("ADDED")
                        .data(res)
                        .build()
        );
        sendUserConversationByUserId(msg.getSenderId());
        sendUserConversationByUserId(msg.getReceiverId());
    }


    @Transactional

    public void deleteConversationByConversationId(int conversationId) {
        Conversation c = new Conversation();
        c.setConversationId(conversationId);
        messageRepository.deleteAllByConversation(c);
        conversationRepository.deleteById(conversationId);
    }



    public void deleteMessageByMessageId(int conversationId, int messageId) {
        messageRepository.deleteById(messageId);
        // notify listener
        sendMessagesByConversationId(conversationId);
    }
}

