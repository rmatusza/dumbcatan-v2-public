package com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.response;

public class ErrorMessage {

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorMessage(String message) {
        this.message = message;
    }

    public ErrorMessage(){}
}
