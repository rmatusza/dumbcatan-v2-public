package com.dumbcatanv2.dumb_catan_v2_server.dto.response;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/* DTO for sending API success / error info */
public class ApiResponse {
    private boolean success = false;
    private String message;
    private int status;
    private LocalDateTime timestamp;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public ApiResponse(boolean success, String message, int status, LocalDateTime timestamp) {
        this.message = message;
        this.status = status;
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
        this.success = success;
    }

    public ApiResponse(String message, int status) {
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(String message){
        this.message = message;
    }

    public ApiResponse(){}
}
