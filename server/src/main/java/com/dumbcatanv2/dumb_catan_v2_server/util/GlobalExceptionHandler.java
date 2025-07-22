package com.dumbcatanv2.dumb_catan_v2_server.util;

import com.dumbcatanv2.dumb_catan_v2_server.dto.response.ApiResponse;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.*;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /*exception that gets thrown when one or more of the DTO field validation checks fails*/
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<ApiResponse> handleInvalidLoginError(InvalidLoginException ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), 401), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NonUniqueUsernameException.class)
    public ResponseEntity<ApiResponse> handleNonUniqueUsernameError(NonUniqueUsernameException ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), 409), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ApiResponse> handleDatabaseError(DataAccessException ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), 503),
                HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse> handleBadCredentialsError(BadCredentialsException ex) {
        return new ResponseEntity<>(new ApiResponse("Invalid username and/or password", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse> handleUsernameNotFoundError(UsernameNotFoundException ex) {
        return new ResponseEntity<>(new ApiResponse("Invalid username and/or password", 404),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<ApiResponse> handleRecordNotFoundError(RecordNotFoundException ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), 404),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiResponse> handleAccountDisabledError(DisabledException ex) {
        return new ResponseEntity<>(new ApiResponse("Account is locked", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(io.jsonwebtoken.ExpiredJwtException.class)
    public ResponseEntity<ApiResponse> handleExpiredJwtError(io.jsonwebtoken.ExpiredJwtException ex) {
        return new ResponseEntity<>(new ApiResponse("JWT is expired", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(io.jsonwebtoken.JwtException.class)
    public ResponseEntity<ApiResponse> handleInvalidJwtError(io.jsonwebtoken.JwtException ex) {
        return new ResponseEntity<>(new ApiResponse("JWT is invalid", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MaxActiveGamesExceededException.class)
    public ResponseEntity<ApiResponse> handleExceededMaxActiveGamesError(MaxActiveGamesExceededException ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), 403),
                HttpStatus.UNAUTHORIZED);
    }

    /* Catch-all fallback (optional) */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGenericException(Exception ex) {
        return new ResponseEntity<>(new ApiResponse(ex.getMessage(), 500),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /*find out what the below is for*/
    // Optional: handle other validation exceptions like @Validated on path/query params
    //    @ExceptionHandler(ConstraintViolationException.class)
    //    public ResponseEntity<Map<String, String>> handleConstraintViolation(ConstraintViolationException ex) {
    //        Map<String, String> errors = new HashMap<>();
    //
    //        ex.getConstraintViolations().forEach(violation -> {
    //            String fieldName = violation.getPropertyPath().toString();
    //            errors.put(fieldName, violation.getMessage());
    //        });
    //
    //        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    //    }
}

