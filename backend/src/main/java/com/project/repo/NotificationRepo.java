package com.project.repo;

import com.project.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {

    List<Notification> findByUser_UserIdOrderByCreatedDesc(Long userId);

    long countByUser_UserIdAndIsReadFalse(Long userId);
}
