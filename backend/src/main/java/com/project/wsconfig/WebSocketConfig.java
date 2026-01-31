package com.project.wsconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.project.video.SignalingHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	@Bean
	SignalingHandler signalingHandler() {
		return new SignalingHandler();
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(signalingHandler(), "/ws/signaling")
				.setAllowedOriginPatterns(
						"https://*.local:*",
						"https://localhost:*", 
						"https://192.168.*:*", 
						"https://10.*:*");
	}
}
