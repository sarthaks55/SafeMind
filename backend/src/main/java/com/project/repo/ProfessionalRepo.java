package com.project.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.entities.Professional;

public interface ProfessionalRepo extends JpaRepository<Professional, Long>{
	
	Optional<Professional> findByUser_UserId(Long userId);
	
	@Query("""
		    SELECT p FROM Professional p
		    JOIN FETCH p.user u
		    WHERE u.role.roleName = 'ROLE_PROFESSIONAL'
		""")
		List<Professional> findAllProfessionalsWithUser();

	@Query("""
		    SELECT p
		    FROM Professional p
		    JOIN FETCH p.user
		    WHERE p.isVerified = true
		""")
		List<Professional> findAllVerifiedProfessionalsWithUser();

}
