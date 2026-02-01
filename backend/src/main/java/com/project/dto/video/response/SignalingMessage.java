package com.project.dto.video.response;

import lombok.Data;

@Data
public class SignalingMessage {

    private String type;       // JOIN, OFFER, ANSWER, ICE, LEAVE
    private String roomToken;  // video session room
    private String senderId;   // user id (optional)
    private String payload;    // SDP or ICE candidate JSON

    
}