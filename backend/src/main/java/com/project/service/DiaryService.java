package com.project.service;

import com.project.dto.DiaryRequestDTO;
import com.project.dto.DiaryResponseDTO;

import java.util.List;

public interface DiaryService {

    DiaryResponseDTO create(Long userId, DiaryRequestDTO dto);

    DiaryResponseDTO update(Long diaryId, Long userId, DiaryRequestDTO dto);

    void delete(Long diaryId, Long userId);

    List<DiaryResponseDTO> getAll(Long userId);
}