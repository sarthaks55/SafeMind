package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.notification.response.NotificationDTO;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /* ================= GET ALL ================= */

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getMyNotifications(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        List<NotificationDTO> notifications =
                notificationService.getUserNotifications(
                        userDetails.getUserId());

        return ResponseBuilder.success(
                "Notifications fetched successfully",
                notifications,
                HttpStatus.OK
        );
    }

    /* ================= MARK READ ================= */

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Object>> markRead(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        notificationService.markAsRead(
                id,
                userDetails.getUserId());

        return ResponseBuilder.success(
                "Notification marked as read",
                null,
                HttpStatus.NO_CONTENT
        );
    }

    /* ================= UNREAD COUNT ================= */

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Long>> unreadCount(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        long count =
                notificationService.getUnreadCount(
                        userDetails.getUserId());

        return ResponseBuilder.success(
                "Unread notification count fetched successfully",
                count,
                HttpStatus.OK
        );
    }
}
