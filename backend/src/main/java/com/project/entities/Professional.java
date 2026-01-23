package com.project.entities;

import java.math.BigDecimal;

import org.hibernate.annotations.Type;

import com.project.enums.Specialization;

import jakarta.persistence.CascadeType;
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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "professionals",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "user_id")
    }
)
@Getter
@Setter
public class Professional extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long professionalId;

    /**
     * User account linked to this professional
     */
    @OneToOne(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Specialization specialization;

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

	public Professional(User user,  @NotNull SpokenLanguage spokenLanguage,
			@Min(0) int experienceYears, String qualification, String bio,
			@DecimalMin("0.0") BigDecimal consultationFee) {
		super();
		this.user = user;
		this.spokenLanguage = spokenLanguage;
		this.experienceYears = experienceYears;
		this.qualification = qualification;
		this.bio = bio;
		this.consultationFee = consultationFee;
	}
    
    
}

