package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.notification.response.NotificationDTO;
import com.project.entities.Notification;
import com.project.entities.User;
import com.project.exception.NotificationNotFoundException;
import com.project.repo.NotificationRepo;
import com.project.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepo notificationRepo;
    private final UserRepository userRepo;
    private final EmailService emailService;

    @Override
    public void sendInAppNotification(Long userId, String title, String message) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);

        notificationRepo.save(notification);
    }

    @Override
    public void sendEmailNotification(String email, String subject, String body) {
        emailService.sendEmail(email, subject, body);
    }

    @Override
    public List<NotificationDTO> getUserNotifications(Long userId) {

        return notificationRepo
                .findByUser_UserIdOrderByCreatedDesc(userId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public void markAsRead(Long notificationId, Long userId) {

        Notification notification = notificationRepo.findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException("Notification not found"));

        if (!notification.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        notification.setRead(true);
        notificationRepo.save(notification);
    }

    @Override
    public long getUnreadCount(Long userId) {
        return notificationRepo.countByUser_UserIdAndIsReadFalse(userId);
    }

    private NotificationDTO mapToDTO(Notification n) {
        NotificationDTO dto = new NotificationDTO();
        dto.setNotificationId(n.getNotificationId());
        dto.setTitle(n.getTitle());
        dto.setMessage(n.getMessage());
        dto.setRead(n.isRead());
        dto.setCreated(n.getCreated());
        return dto;
    }
}
