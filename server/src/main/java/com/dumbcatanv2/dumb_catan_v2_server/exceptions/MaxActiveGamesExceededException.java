package com.dumbcatanv2.dumb_catan_v2_server.exceptions;

public class MaxActiveGamesExceededException extends RuntimeException{
    public MaxActiveGamesExceededException(String message) {
        super(message);
    }
}
