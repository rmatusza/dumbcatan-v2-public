package com.dumbcatanv2.dumb_catan_v2_server.exceptions;

public class InvalidSignupException extends RuntimeException{
    public InvalidSignupException(String message) {
        super(message);
    }
}
