package com.hana8.demo.entity;

import java.time.Instant;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Entity
@Data
@Table(name = "User", uniqueConstraints = {
	@UniqueConstraint(
		name = "uniq_User_email",
		columnNames = {"email"}
	),
	@UniqueConstraint(
		name = "uniq_User_username_telno",
		columnNames = {"username", "telno"}
	)
})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, columnDefinition = "int unsigned") // update할 때 이 컬럼 제외 & unsigned int로 설정
	private Long id;

	@Column(nullable = false, length = 31) // null 허용 x & 최대 31자
	private String username;

	@Column(unique = true, nullable = false) // 컬럼에 unique key 부여
	private String email;

	@Column(nullable = false, length = 12)
	private String telno;

	@CreationTimestamp
	private Instant createdAt;

	@CreationTimestamp
	private LocalDateTime updatedAt;

	@Transient
	private int auth; // 테이블에 생성 안됨

}
