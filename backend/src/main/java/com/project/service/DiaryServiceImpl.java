package com.project.service;

import com.project.dto.DiaryRequestDTO;
import com.project.dto.DiaryResponseDTO;
import com.project.entities.DiaryEntry;
import com.project.entities.User;
import com.project.exception.DiaryNotFoundException;
import com.project.repo.DiaryRepository;
import com.project.repo.UserRepository;
import com.project.security.AESUtil;
import com.project.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepo;
    private final UserRepository userRepo;

    @Override
    public DiaryResponseDTO create(Long userId, DiaryRequestDTO dto) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DiaryEntry entry = new DiaryEntry();
        entry.setUser(user);
        entry.setEncryptedText(AESUtil.encrypt(dto.getText()));

        diaryRepo.save(entry);
        return map(entry);
    }

    @Override
    public DiaryResponseDTO update(Long diaryId, Long userId, DiaryRequestDTO dto) {

        DiaryEntry entry = diaryRepo
                .findByDiaryIdAndUser_UserIdAndDeletedFalse(diaryId, userId)
                .orElseThrow(() -> new DiaryNotFoundException("Diary not found"));

        entry.setEncryptedText(AESUtil.encrypt(dto.getText()));
        diaryRepo.save(entry);

        return map(entry);
    }

    @Override
    public void delete(Long diaryId, Long userId) {

        DiaryEntry entry = diaryRepo
                .findByDiaryIdAndUser_UserIdAndDeletedFalse(diaryId, userId)
                .orElseThrow(() -> new DiaryNotFoundException("Diary not found"));

        entry.setDeleted(true);
        diaryRepo.save(entry);
    }

    @Override
    public List<DiaryResponseDTO> getAll(Long userId) {

        return diaryRepo.findByUser_UserIdAndDeletedFalse(userId)
                .stream()
                .map(this::map)
                .toList();
    }

    private DiaryResponseDTO map(DiaryEntry entry) {

        DiaryResponseDTO dto = new DiaryResponseDTO();
        dto.setDiaryId(entry.getDiaryId());
        dto.setText(AESUtil.decrypt(entry.getEncryptedText()));
        dto.setCreatedAt(entry.getCreatedAt());
        dto.setUpdatedAt(entry.getUpdatedAt());
        return dto;
    }
}
