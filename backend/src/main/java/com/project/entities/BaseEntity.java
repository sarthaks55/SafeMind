package com.project.entities;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MappedSuperclass
//Lombok annotations
@Getter
@Setter
@ToString
public abstract class BaseEntity {

    
    @CreationTimestamp
	@Column(name="created_on",updatable = false)
	private LocalDateTime createdAt;
	@UpdateTimestamp
	@Column(name="last_updated")
	private LocalDateTime updatedAt;
}