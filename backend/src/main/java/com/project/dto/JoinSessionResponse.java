package com.project.dto;


import java.time.LocalDateTime;

import lombok.Data;

@Data
public class JoinSessionResponse {

    private String roomToken;
    private String signalingUrl;
    private LocalDateTime allowedFrom;
    private LocalDateTime allowedUntil;
	public JoinSessionResponse(String roomToken, String signalingUrl, LocalDateTime allowedFrom,
			LocalDateTime allowedUntil) {
		super();
		this.roomToken = roomToken;
		this.signalingUrl = signalingUrl;
		this.allowedFrom = allowedFrom;
		this.allowedUntil = allowedUntil;
	}

    
    
}