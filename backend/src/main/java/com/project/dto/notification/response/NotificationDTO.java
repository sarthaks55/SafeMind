package com.project.dto.notification.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long notificationId;
    private String title;
    private String message;
    private boolean isRead;
    private LocalDateTime created;
}
