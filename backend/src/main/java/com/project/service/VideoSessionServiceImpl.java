package com.project.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.entities.Appointment;
import com.project.entities.VideoSession;
import com.project.enums.AppointmentStatus;
import com.project.enums.VideoSessionStatus;
import com.project.repo.VideoSessionRepo;

@Service
@Transactional
public class VideoSessionServiceImpl implements VideoSessionService {

	@Autowired
	private VideoSessionRepo videoSessionRepo;


	@Override
	public VideoSession createOrGetVideoSession(Appointment appointment) {

		// 1️⃣ Appointment status validation
		if (appointment.getStatus() != AppointmentStatus.CONFIRMED) {
			throw new IllegalStateException("Video session allowed only for CONFIRMED appointments");
		}

		// 2️⃣ Time window validation
		LocalDateTime now = LocalDateTime.now();
		System.out.println("--------------------------------");
		System.out.println(now);
		System.out.println(appointment.getStartTime());
		System.out.println(appointment.getEndTime());
		System.out.println("--------------------------------");
		if (now.isBefore(appointment.getStartTime()) || now.isAfter(appointment.getEndTime())) {
			throw new IllegalStateException("Outside appointment time window");
		}

		// 3️⃣ Idempotent fetch-or-create
		return videoSessionRepo.findByAppointmentAppointmentId(appointment.getAppointmentId())
				.orElseGet(() -> createNewSession(appointment));
	}

	private VideoSession createNewSession(Appointment appointment) {

		VideoSession session = new VideoSession();
		session.setAppointment(appointment);
		session.setRoomToken(UUID.randomUUID().toString());
		session.setAllowedFrom(appointment.getStartTime());
		session.setAllowedUntil(appointment.getEndTime());
		session.setStatus(VideoSessionStatus.CREATED);

		return videoSessionRepo.save(session);
	}

	@Override
	public void markParticipantJoined(VideoSession session, boolean isProfessional) {

		if (session.getStatus() == VideoSessionStatus.COMPLETED || session.getStatus() == VideoSessionStatus.EXPIRED) {
			throw new IllegalStateException("Session already ended");
		}

		if (isProfessional) {
			session.setProfessionalJoined(LocalDateTime.now());
		} else {
			session.setPatientJoined(LocalDateTime.now());
		}

		session.setStatus(VideoSessionStatus.ACTIVE);
		videoSessionRepo.save(session);
	}

	@Override
	public void endSession(VideoSession session) {
		session.setStatus(VideoSessionStatus.COMPLETED);
		videoSessionRepo.save(session);
	}

	@Override
	public VideoSession getById(Long videoSessionId) {
		
		return videoSessionRepo.findByVideoSessionId(videoSessionId);
	}

}
