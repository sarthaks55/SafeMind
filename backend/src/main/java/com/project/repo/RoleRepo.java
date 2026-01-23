package com.project.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {
	
	Role findByRoleName(String roleName);

}
