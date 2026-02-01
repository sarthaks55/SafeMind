package com.project.dto.user.request;

import com.project.enums.Gender;
import lombok.Data;

@Data
public class UserUpdateDTO {
    private String fullName;
    private String email;
    private String phone;
    private Gender gender;
}
