package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.dto.DiaryRequestDTO;
import com.project.dto.DiaryResponseDTO;
import com.project.security.CustomUserDetails;
import com.project.service.DiaryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    /* ================= CREATE ================= */

    @PostMapping
    public ResponseEntity<DiaryResponseDTO> create(
            @RequestBody @Valid DiaryRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        DiaryResponseDTO response =
                diaryService.create(user.getUserId(), dto);

        return ResponseEntity.status(201).body(response); // 201 CREATED
    }

    /* ================= UPDATE ================= */

    @PutMapping("/{id}")
    public ResponseEntity<DiaryResponseDTO> update(
            @PathVariable Long id,
            @RequestBody @Valid DiaryRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        DiaryResponseDTO response =
                diaryService.update(id, user.getUserId(), dto);

        return ResponseEntity.ok(response); // 200
    }

    /* ================= DELETE ================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        diaryService.delete(id, user.getUserId());

        return ResponseEntity.noContent().build(); // 204
    }

    /* ================= GET ALL ================= */

    @GetMapping
    public ResponseEntity<List<DiaryResponseDTO>> getAll(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<DiaryResponseDTO> diaries =
                diaryService.getAll(user.getUserId());

        return ResponseEntity.ok(diaries); // 200
    }
}
