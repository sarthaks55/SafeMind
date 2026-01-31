package com.project.service;

import org.springframework.stereotype.Service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;

@Service
public class TwilioSmsServiceImpl implements SmsService {

    @Value("${twilio.from-number}")
    private String fromNumber;

    @Override
    public void sendSms(String phone, String message) {

        try {
            Message.creator(
                    new PhoneNumber(formatPhone(phone)),
                    new PhoneNumber(fromNumber),
                    message
            ).create();

        } catch (Exception e) {
            // ❗ NEVER break business flow due to SMS failure
            System.err.println("Failed to send SMS: " + e.getMessage());
        }
    }

    // Ensure country code (India example)
    private String formatPhone(String phone) {
        if (phone.startsWith("+")) {
            return phone;
        }
        return "+91" + phone; // change country code if needed
    }
}
