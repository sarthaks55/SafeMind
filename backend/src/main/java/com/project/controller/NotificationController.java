package com.project.controller;

import com.project.dto.NotificationDTO;
import com.project.security.CustomUserDetails;
import com.project.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationDTO> getMyNotifications(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return notificationService.getUserNotifications(userDetails.getUserId());
    }

    @PutMapping("/{id}/read")
    public void markRead(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        notificationService.markAsRead(id, userDetails.getUserId());
    }

    @GetMapping("/unread-count")
    public long unreadCount(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return notificationService.getUnreadCount(userDetails.getUserId());
    }
}
