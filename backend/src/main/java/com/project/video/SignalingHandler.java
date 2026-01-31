package com.project.video;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.dto.SignalingMessage;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SignalingHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // No-op: wait for JOIN message
    }

    @Override
    protected void handleTextMessage(
            WebSocketSession session,
            TextMessage message
    ) throws Exception {

        SignalingMessage signalingMessage =
                objectMapper.readValue(message.getPayload(), SignalingMessage.class);

        String roomToken = signalingMessage.getRoomToken();

        switch (signalingMessage.getType()) {

            case "JOIN" -> {
                WebSocketSessionRegistry.addSession(roomToken, session);
            }

            case "OFFER", "ANSWER", "ICE" -> {
                relayToOthers(roomToken, session, message);
            }

            case "LEAVE" -> {
                WebSocketSessionRegistry.removeSession(roomToken, session);
            }

            default -> {
                // ignore unknown messages
            }
        }
    }

    @Override
    public void afterConnectionClosed(
            WebSocketSession session,
            CloseStatus status
    ) {
        // Remove session from all rooms safely
        WebSocketSessionRegistry.getOtherSessions(null, session);
    }

    private void relayToOthers(
            String roomToken,
            WebSocketSession sender,
            TextMessage message
    ) throws Exception {

        for (WebSocketSession peer :
                WebSocketSessionRegistry.getOtherSessions(roomToken, sender)) {

            if (peer.isOpen()) {
                peer.sendMessage(message);
            }
        }
    }
}
