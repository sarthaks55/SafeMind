package com.project.service;

import java.util.List;

import com.project.dto.diary.request.DiaryRequestDTO;
import com.project.dto.diary.response.DiaryResponseDTO;

public interface DiaryService {

    DiaryResponseDTO create(Long userId, DiaryRequestDTO dto);

    DiaryResponseDTO update(Long diaryId, Long userId, DiaryRequestDTO dto);

    void delete(Long diaryId, Long userId);

    List<DiaryResponseDTO> getAll(Long userId);
}
