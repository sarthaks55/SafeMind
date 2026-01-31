package com.project.controller;

import com.project.dto.NotificationDTO;
import com.project.security.CustomUserDetails;
import com.project.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /* ================= GET ALL ================= */

    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getMyNotifications(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        List<NotificationDTO> notifications =
                notificationService.getUserNotifications(userDetails.getUserId());

        return ResponseEntity.ok(notifications); // 200 OK
    }

    /* ================= MARK READ ================= */

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markRead(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        notificationService.markAsRead(id, userDetails.getUserId());

        return ResponseEntity.noContent().build(); // 204 NO CONTENT
    }

    /* ================= UNREAD COUNT ================= */

    @GetMapping("/unread-count")
    public ResponseEntity<Long> unreadCount(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        long count = notificationService.getUnreadCount(userDetails.getUserId());

        return ResponseEntity.ok(count); // 200 OK
    }
}
