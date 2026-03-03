package com.hana8.demo.entity;

import java.time.Instant;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@MappedSuperclass
public class BaseEntity {

	@CreationTimestamp
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false, updatable = false)
	private Instant createdAt;

	@CreationTimestamp
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", nullable = false)
	private LocalDateTime updatedAt;
}
