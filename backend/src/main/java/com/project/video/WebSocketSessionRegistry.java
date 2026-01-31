package com.project.video;



import org.springframework.web.socket.WebSocketSession;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketSessionRegistry {
	
	public static void addSession(String roomToken, WebSocketSession session) {
	    Set<WebSocketSession> roomSessions = ROOMS.computeIfAbsent(roomToken, k -> ConcurrentHashMap.newKeySet());
	    
	    // Notify existing sessions that someone joined
	    for (WebSocketSession existingSession : roomSessions) {
	        if (existingSession.isOpen()) {
	            try {
	                existingSession.sendMessage(new org.springframework.web.socket.TextMessage(
	                    "{\"type\":\"user-joined\",\"roomToken\":\"" + roomToken + "\"}"
	                ));
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	    }
	    
	    roomSessions.add(session);
	}


    // roomToken → WebSocket sessions
    private static final Map<String, Set<WebSocketSession>> ROOMS =
            new ConcurrentHashMap<>();

   

    public static void removeSession(String roomToken, WebSocketSession session) {
        Set<WebSocketSession> sessions = ROOMS.get(roomToken);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                ROOMS.remove(roomToken);
            }
        }
    }

    public static Set<WebSocketSession> getOtherSessions(
            String roomToken,
            WebSocketSession currentSession
    ) {
        Set<WebSocketSession> sessions = ROOMS.get(roomToken);
        if (sessions == null) return Collections.emptySet();

        Set<WebSocketSession> others = new HashSet<>(sessions);
        others.remove(currentSession);
        return others;
    }
}