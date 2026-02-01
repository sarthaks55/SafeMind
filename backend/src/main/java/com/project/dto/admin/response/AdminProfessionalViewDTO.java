package com.project.dto.admin.response;

import lombok.Data;

@Data
public class AdminProfessionalViewDTO {
    private Long professionalId;
    private Long userId;
    private String fullName;
    private String email;
    private boolean isVerified;
}
