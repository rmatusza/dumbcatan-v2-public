package com.dumbcatanv2.dumb_catan_v2_server.exceptions;

public class NonUniqueUsernameException extends RuntimeException{
    public NonUniqueUsernameException(String message) { super(message); }
}
