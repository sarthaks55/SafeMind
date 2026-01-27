package com.project.controller;

import com.project.dto.DiaryRequestDTO;
import com.project.dto.DiaryResponseDTO;
import com.project.security.CustomUserDetails;
import com.project.service.DiaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    

    @PostMapping
    public DiaryResponseDTO create(
            @RequestBody @Valid DiaryRequestDTO dto,Authentication auth) {
    	CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();
        return diaryService.create(user.getUserId(), dto);
    }

    @PutMapping("/{id}")
    public DiaryResponseDTO update(
            @PathVariable Long id,
            @RequestBody @Valid DiaryRequestDTO dto,Authentication auth) {
    	CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();
        return diaryService.update(id, user.getUserId(), dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id,Authentication auth) {
    	CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();
        diaryService.delete(id, user.getUserId());
    }

    @GetMapping
    public List<DiaryResponseDTO> getAll(Authentication auth) {
    	CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();
        return diaryService.getAll(user.getUserId());
    }
}
