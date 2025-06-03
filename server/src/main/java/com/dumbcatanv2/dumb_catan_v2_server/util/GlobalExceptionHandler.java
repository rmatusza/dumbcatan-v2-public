package com.dumbcatanv2.dumb_catan_v2_server.util;

import com.dumbcatanv2.dumb_catan_v2_server.dto.ApiErrorResponse;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.InvalidLoginException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.InvalidSignupException;
import com.dumbcatanv2.dumb_catan_v2_server.exceptions.UserIdNotFound;
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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidLogin(InvalidLoginException ex) {
        return new ResponseEntity<>(new ApiErrorResponse(ex.getMessage(), 401), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidSignupException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidSignup(InvalidSignupException ex) {
        return new ResponseEntity<>(new ApiErrorResponse(ex.getMessage(), 400), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ApiErrorResponse> handleDatabaseError(DataAccessException ex) {
        return new ResponseEntity<>(new ApiErrorResponse(ex.getMessage(), 503),
                HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentialsError(BadCredentialsException ex) {
        return new ResponseEntity<>(new ApiErrorResponse("Invalid username and/or password", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUsernameNotFoundError(UsernameNotFoundException ex) {
        return new ResponseEntity<>(new ApiErrorResponse("Invalid username and/or password", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserIdNotFound.class)
    public ResponseEntity<ApiErrorResponse> handleUserNotFoundError(UserIdNotFound ex) {
        return new ResponseEntity<>(new ApiErrorResponse("No user was found with the provided user ID", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiErrorResponse> handleAccountDisabledError(DisabledException ex) {
        return new ResponseEntity<>(new ApiErrorResponse("Account is locked", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(io.jsonwebtoken.ExpiredJwtException.class)
    public ResponseEntity<ApiErrorResponse> handleExpiredJwtError(io.jsonwebtoken.ExpiredJwtException ex) {
        return new ResponseEntity<>(new ApiErrorResponse("JWT is expired", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(io.jsonwebtoken.JwtException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidJwtError(io.jsonwebtoken.JwtException ex) {
        return new ResponseEntity<>(new ApiErrorResponse("JWT is invalid", 401),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(Exception ex) {
        return new ResponseEntity<>(new ApiErrorResponse(ex.getMessage(), 500),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

