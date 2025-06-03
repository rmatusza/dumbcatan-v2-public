package com.dumbcatanv2.dumb_catan_v2_server.exceptions;

public class InvalidLoginException extends RuntimeException{
    public InvalidLoginException(String message) {
        super(message);
    }
}
