package com.project.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404 Not Found
    @ExceptionHandler({
            AdminNotFoundException.class,
            AppointmentNotFoundException.class,
            AssessmentNotFoundException.class,
            DiaryNotFoundException.class,
            MoodNotFoundException.class,
            NotificationNotFoundException.class,
            ProfessionalNotFoundException.class,
            RoleNotFoundException.class,
            SpecializationNotFoundException.class,
            UserNotFoundException.class
    })
    public ResponseEntity<ApiError> handleNotFound(RuntimeException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // 400 Bad Request
    @ExceptionHandler({
            DuplicateEmailException.class,
            EmailAlreadyExistsException.class,
            InvalidAppointmentActionException.class,
            InvalidAppointmentStatusException.class,
            InvalidAssessmentSubmissionException.class,
            InvalidRoleOperationException.class,
            MoodAlreadyExistsException.class,
            SlotAlreadyBookedException.class
    })
    public ResponseEntity<ApiError> handleBadRequest(RuntimeException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 403 Forbidden
    @ExceptionHandler({
            UnauthorizedAppointmentAccessException.class,
            UnauthorizedDiaryAccessException.class
    })
    public ResponseEntity<ApiError> handleForbidden(RuntimeException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    // 500 Internal Server Error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleAllUnhandled(Exception ex) {
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred"
        );
    }
    
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<String> handleDisabledUser() {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Account not verified. Please verify OTP.");
    }

    private ResponseEntity<ApiError> buildResponse(
            HttpStatus status, String message) {

        ApiError error = new ApiError(
                status.value(),
                message,
                LocalDateTime.now()
        );

        return ResponseEntity.status(status).body(error);
    }
}
