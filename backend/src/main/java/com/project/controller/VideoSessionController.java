package com.project.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.JoinSessionResponse;
import com.project.entities.Appointment;
import com.project.entities.VideoSession;
import com.project.repo.AppointmentRepository;
import com.project.service.AppointmentService;
import com.project.service.VideoSessionService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/video-sessions")
public class VideoSessionController {

	@Autowired
    private VideoSessionService videoSessionService;
	@Autowired
	private AppointmentRepository appointmentRepo;

    

    /**
     * Join video session for an appointment.
     */
    @PostMapping("/appointments/{appointmentId}/join")
    public ResponseEntity<JoinSessionResponse> joinSession(
            @PathVariable Long appointmentId,
            HttpServletRequest request
    ) {

        // 1️⃣ Fetch appointment
        Appointment appointment =
                appointmentRepo.findById(appointmentId).orElseThrow();

        // 2️⃣ Create or get video session
        VideoSession session =
                videoSessionService.createOrGetVideoSession(appointment);

        String scheme = request.isSecure() ? "wss" : "ws";
        String host = request.getServerName();
        int port = request.getServerPort();

        String wsUrl = scheme + "://" + host +
                (port == 80 || port == 443 ? "" : ":" + port) +
                "/ws/signaling";

        
        // 3️⃣ Build response
        JoinSessionResponse response = new JoinSessionResponse(
                session.getRoomToken(),
                wsUrl,
                session.getAllowedFrom(),
                session.getAllowedUntil()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * End video session explicitly.
     */
    @PostMapping("/{videoSessionId}/end")
    public ResponseEntity<Void> endSession(
            @PathVariable Long videoSessionId
    ) {

        VideoSession session =
                videoSessionService.getById(videoSessionId);

        videoSessionService.endSession(session);
        return ResponseEntity.noContent().build();
    }
}
