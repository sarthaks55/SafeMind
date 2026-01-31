package com.project.service;

import com.project.entities.User;

public interface OtpService {

	public void sendOtp(User user) ;
	
	public void verifyOtp(Long userId, String otp);
}
