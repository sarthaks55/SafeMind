package com.project.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	boolean existsByEmail(String email);
	
	Optional<User> findByEmail(String email);
	
	

	boolean existsByEmailAndUserIdNot(
	        String email,
	        Long userId
	);
	
	List<User> findByRole_RoleName(String roleName);

}
