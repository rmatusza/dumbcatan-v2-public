package com.dumbcatanv2.dumb_catan_v2_server.exceptions;

public class UserIdNotFound extends RuntimeException{

    public UserIdNotFound(String message) {
        super(message);
    }
}
