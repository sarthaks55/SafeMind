package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.diary.request.DiaryRequestDTO;
import com.project.dto.diary.response.DiaryResponseDTO;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
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
    public ResponseEntity<ApiResponse<DiaryResponseDTO>> create(
            @RequestBody @Valid DiaryRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        DiaryResponseDTO response =
                diaryService.create(user.getUserId(), dto);

        return ResponseBuilder.success(
                "Diary created successfully",
                response,
                HttpStatus.CREATED
        );
    }

    /* ================= UPDATE ================= */

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DiaryResponseDTO>> update(
            @PathVariable Long id,
            @RequestBody @Valid DiaryRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        DiaryResponseDTO response =
                diaryService.update(id, user.getUserId(), dto);

        return ResponseBuilder.success(
                "Diary updated successfully",
                response,
                HttpStatus.OK
        );
    }

    /* ================= DELETE ================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> delete(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        diaryService.delete(id, user.getUserId());

        return ResponseBuilder.success(
                "Diary deleted successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }

    /* ================= GET ALL ================= */

    @GetMapping
    public ResponseEntity<ApiResponse<List<DiaryResponseDTO>>> getAll(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<DiaryResponseDTO> diaries =
                diaryService.getAll(user.getUserId());

        return ResponseBuilder.success(
                "Diaries fetched successfully",
                diaries,
                HttpStatus.OK
        );
    }
}
