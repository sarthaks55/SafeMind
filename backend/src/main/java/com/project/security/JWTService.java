package com.project.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTService {

    private static final String SECRET_KEY =
            "YashSarthakAnushkaSanskrutiSafemindCDACMumbai";

    private static final long EXPIRATION =
            1000 * 60 * 60; // 1 hour

    /* ================= TOKEN GENERATION ================= */

    public String generateToken(CustomUserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userDetails.getUserId());
        claims.put("email", userDetails.getUsername());
        claims.put("fullName", userDetails.getFullName());
        claims.put("role",
                userDetails.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
        );

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername()) // email
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /* ================= CLAIM EXTRACTION ================= */

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Long extractUserId(String token) {
        return extractClaim(token, claims ->
                claims.get("userId", Long.class));
    }

    public String extractFullName(String token) {
        return extractClaim(token, claims ->
                claims.get("fullName", String.class));
    }

    public String extractRole(String token) {
        return extractClaim(token, claims ->
                claims.get("role", String.class));
    }

    /* ================= VALIDATION ================= */

    public boolean isTokenValid(String token, String email) {
        return extractEmail(token).equals(email)
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration)
                .before(new Date());
    }

    private <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return resolver.apply(claims);
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(SECRET_KEY)
        );
    }
}
