package com.project.entities;

import java.time.Instant;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.project.enums.VideoSessionStatus;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(
    name = "video_sessions"
)
@Data
public class VideoSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long videoSessionId;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @Column(nullable = false, unique = true)
    private String roomToken;

    private LocalDateTime allowedFrom;
    private LocalDateTime allowedUntil;

    private LocalDateTime patientJoined;
    private LocalDateTime professionalJoined;

    @CreationTimestamp
    private Instant createdAt;

    @Enumerated(EnumType.STRING)
    private VideoSessionStatus status;
}