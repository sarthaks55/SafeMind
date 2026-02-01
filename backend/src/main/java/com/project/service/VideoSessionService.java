package com.project.service;

import org.springframework.stereotype.Service;

import com.project.entities.VideoSession;

@Service
public interface VideoSessionService {

    VideoSession createOrGetVideoSession(Long appointmentId);

    void markParticipantJoined(Long videoSessionId, boolean isProfessional);

    void endSession(Long videoSessionId);

    VideoSession getById(Long videoSessionId);
}
