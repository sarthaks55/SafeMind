package com.project.service;

import com.project.dto.NotificationDTO;

import java.util.List;

public interface NotificationService {

    void sendInAppNotification(Long userId, String title, String message);

    void sendEmailNotification(String email, String subject, String body);

    List<NotificationDTO> getUserNotifications(Long userId);

    void markAsRead(Long notificationId, Long userId);

    long getUnreadCount(Long userId);
}
