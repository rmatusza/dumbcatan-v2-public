package com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.response;

import java.time.LocalDateTime;

public class WsResponse {
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public WsResponse(String message, int status, boolean success) {
        this.message = message;
        this.status = status;
        this.success = success;
        this.timestamp = LocalDateTime.now();
    }

    public WsResponse(){}
}
