package com.project.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /* ===================== 404 NOT FOUND ===================== */

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
    public ResponseEntity<ApiResponse<Object>> handleNotFound(RuntimeException ex) {
        return buildError(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    /* ===================== 400 BAD REQUEST ===================== */

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
    public ResponseEntity<ApiResponse<Object>> handleBadRequest(RuntimeException ex) {
        return buildError(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    /* ===================== 403 FORBIDDEN ===================== */

    @ExceptionHandler({
            UnauthorizedAppointmentAccessException.class,
            UnauthorizedDiaryAccessException.class,
            DisabledException.class
    })
    public ResponseEntity<ApiResponse<Object>> handleForbidden(RuntimeException ex) {
        return buildError(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    /* ===================== 500 INTERNAL SERVER ERROR ===================== */

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleUnhandled(Exception ex) {
        return buildError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred"
        );
    }

    /* ===================== COMMON BUILDER ===================== */

    private ResponseEntity<ApiResponse<Object>> buildError(
            HttpStatus status, String message) {

        ApiResponse<Object> response =
                new ApiResponse<>(false, message, null);

        return ResponseEntity.status(status).body(response);
    }
}
