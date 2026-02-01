package com.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.video.response.JoinSessionResponse;
import com.project.entities.VideoSession;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.service.VideoSessionService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/video-sessions")
@RequiredArgsConstructor
public class VideoSessionController {

    private final VideoSessionService videoSessionService;

    /* ================= JOIN SESSION ================= */

    @PostMapping("/appointments/{appointmentId}/join")
    public ResponseEntity<ApiResponse<JoinSessionResponse>> joinSession(
            @PathVariable Long appointmentId,
            HttpServletRequest request) {

        // service will throw AppointmentNotFoundException if invalid
        VideoSession session =
                videoSessionService.createOrGetVideoSession(appointmentId);

        String scheme = request.isSecure() ? "wss" : "ws";
        String host = request.getServerName();
        int port = request.getServerPort();

        String wsUrl = scheme + "://" + host +
                (port == 80 || port == 443 ? "" : ":" + port) +
                "/ws/signaling";

        JoinSessionResponse response = new JoinSessionResponse(
                session.getRoomToken(),
                wsUrl,
                session.getAllowedFrom(),
                session.getAllowedUntil()
        );

        return ResponseBuilder.success(
                "Joined video session successfully",
                response,
                HttpStatus.OK
        );
    }

    /* ================= END SESSION ================= */

    @PostMapping("/{videoSessionId}/end")
    public ResponseEntity<ApiResponse<Object>> endSession(
            @PathVariable Long videoSessionId) {

        videoSessionService.endSession(videoSessionId);

        return ResponseBuilder.success(
                "Video session ended successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }
}
