package com.project.security;


import java.util.Collection;
import java.util.Collections;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.entities.User;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return user.getUserId();
    }

    public String getFullName() {
        return user.getFullName();
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // email as username
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(
                new SimpleGrantedAuthority(user.getRole().getRoleName())
        );
    }


    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override
	public boolean isEnabled() {
	    return user.isActive(); // 🔥 THIS IS THE KEY
	}

	@Override
	public @Nullable String getPassword() {
		
		return user.getPasswordHash();
	}
	
	

}
