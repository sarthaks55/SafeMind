package com.project.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phone")
    }
)
@Getter
@Setter
@ToString
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @NotBlank
    @Size(max = 100)
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String passwordHash;

    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid phone number")
    private String phone;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private boolean isActive = true;
    private boolean isDeleted = false;
    
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Professional professional;
    
    public User() {
		// TODO Auto-generated constructor stub
	}

	public User(@NotBlank @Size(max = 100) String fullName, @Email @NotBlank String email,
			@NotBlank String passwordHash,
			@Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid phone number") String phone) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.passwordHash = passwordHash;
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", role=" + role + ", fullName=" + fullName + ", email=" + email
				+ ", passwordHash=" + passwordHash + ", phone=" + phone + ", gender=" + gender + ", isActive="
				+ isActive + ", isDeleted=" + isDeleted + ", professional=" + professional + "]";
	}
	
    
}
