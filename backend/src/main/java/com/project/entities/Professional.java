package com.project.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(
    name = "professionals",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "user_id")
    }
)
public class Professional extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long professionalId;

    /**
     * User account linked to this professional
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private ProfessionalSpecialization specialization;

    @Enumerated(EnumType.STRING)
    @NotNull
    private SpokenLanguage spokenLanguage;

    @Min(0)
    private int experienceYears;

    @Lob
    private String qualification;

    @Lob
    private String bio;

    @DecimalMin("0.0")
    private BigDecimal consultationFee;

    private boolean isVerified = false;
}

