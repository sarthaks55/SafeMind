package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.assessment.request.AssessmentSubmitRequestDTO;
import com.project.dto.assessment.response.AssessmentDetailDTO;
import com.project.dto.assessment.response.AssessmentListDTO;
import com.project.dto.assessment.response.AssessmentOptionDTO;
import com.project.dto.assessment.response.AssessmentQuestionDTO;
import com.project.dto.assessment.response.AssessmentResultDTO;
import com.project.entities.Assessment;
import com.project.entities.AssessmentQuestion;
import com.project.entities.AssessmentResultRange;
import com.project.exception.AssessmentNotFoundException;
import com.project.exception.InvalidAssessmentSubmissionException;
import com.project.repo.AssessmentQuestionRepository;
import com.project.repo.AssessmentRepository;
import com.project.repo.AssessmentResultRangeRepository;

@Service
@Transactional(readOnly = true)
public class AssessmentServiceImpl implements AssessmentService {

    private final AssessmentRepository assessmentRepo;
    private final AssessmentQuestionRepository questionRepo;
    private final AssessmentResultRangeRepository rangeRepo;

    public AssessmentServiceImpl(
            AssessmentRepository assessmentRepo,
            AssessmentQuestionRepository questionRepo,
            AssessmentResultRangeRepository rangeRepo) {
        this.assessmentRepo = assessmentRepo;
        this.questionRepo = questionRepo;
        this.rangeRepo = rangeRepo;
    }

    @Override
    public List<AssessmentListDTO> getAllAssessments() {
        return assessmentRepo.findAll().stream()
                .map(a -> {
                    AssessmentListDTO dto = new AssessmentListDTO();
                    dto.setAssessmentId(a.getAssessmentId());
                    dto.setTitle(a.getTitle());
                    dto.setDescription(a.getDescription());
                    return dto;
                }).toList();
    }

    @Override
    public AssessmentDetailDTO getAssessment(Long assessmentId) {

        Assessment assessment = assessmentRepo.findById(assessmentId)
                .orElseThrow(() ->
                        new AssessmentNotFoundException("Assessment not found"));

        List<AssessmentQuestion> questions =
                questionRepo.findByAssessment_AssessmentIdOrderByOrderIndex(assessmentId);

        AssessmentDetailDTO dto = new AssessmentDetailDTO();
        dto.setAssessmentId(assessment.getAssessmentId());
        dto.setTitle(assessment.getTitle());
        dto.setDescription(assessment.getDescription());

        dto.setQuestions(
                questions.stream().map(q -> {
                    AssessmentQuestionDTO qdto = new AssessmentQuestionDTO();
                    qdto.setQuestionId(q.getQuestionId());
                    qdto.setQuestionText(q.getQuestionText());

                    qdto.setOptions(
                            q.getOptions().stream().map(o -> {
                                AssessmentOptionDTO odto = new AssessmentOptionDTO();
                                odto.setOptionId(o.getOptionId());
                                odto.setOptionText(o.getOptionText());
                                odto.setOptionValue(o.getOptionValue());
                                return odto;
                            }).toList()
                    );
                    return qdto;
                }).toList()
        );

        return dto;
    }

    @Override
    @Transactional
    public AssessmentResultDTO submitAssessment(
            Long assessmentId,
            AssessmentSubmitRequestDTO request) {

        if (request.getAnswers() == null || request.getAnswers().isEmpty()) {
            throw new InvalidAssessmentSubmissionException("Answers cannot be empty");
        }

        double avgScore = request.getAnswers().stream()
                .mapToInt(a -> a.getValue())
                .average()
                .orElseThrow();

        List<AssessmentResultRange> ranges =
                rangeRepo.findByAssessment_AssessmentId(assessmentId);

        AssessmentResultRange matched =
                ranges.stream()
                        .filter(r -> avgScore >= r.getMinScore()
                                && avgScore <= r.getMaxScore())
                        .findFirst()
                        .orElseThrow(() ->
                                new InvalidAssessmentSubmissionException(
                                        "Result range not defined"));

        AssessmentResultDTO result = new AssessmentResultDTO();
        result.setAverageScore(avgScore);
        result.setResultTitle(matched.getResultTitle());
        result.setSuggestion(matched.getSuggestionText());

        return result;
    }
}
