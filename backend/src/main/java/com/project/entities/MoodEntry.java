package com.project.entities;

import java.time.LocalDate;

import com.project.enums.Mood;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "mood_entries",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "entry_date"})
    }
)
public class MoodEntry extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moodId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Mood mood;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;
}