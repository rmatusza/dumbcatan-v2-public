package com.dumbcatanv2.dumb_catan_v2_server.exceptions;

public class InvalidUsernameException extends RuntimeException{
    public InvalidUsernameException(String message) {
        super(message);
    }
}
