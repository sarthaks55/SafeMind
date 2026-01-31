package com.project.service;

import com.project.entities.Appointment;
import com.project.entities.VideoSession;

public interface VideoSessionService {
	
	VideoSession createOrGetVideoSession(Appointment appointment);


	/**
	* Mark participant join (patient / professional).
	*/
	void markParticipantJoined(VideoSession session, boolean isProfessional);


	/**
	* End the video session.
	*/
	void endSession(VideoSession session);


	VideoSession getById(Long videoSessionId);

}
