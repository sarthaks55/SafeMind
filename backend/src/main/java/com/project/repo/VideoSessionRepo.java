package com.project.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.entities.VideoSession;

@Repository
public interface VideoSessionRepo extends JpaRepository<VideoSession, Long> {

	Optional<VideoSession> findByAppointmentAppointmentId(Long appointmentId);

	VideoSession findByVideoSessionId(Long videoSessionId);
}
