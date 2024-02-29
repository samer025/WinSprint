package com.example.backendspr.exceptions;


public class SpringRuntimeException extends RuntimeException{
    public SpringRuntimeException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public SpringRuntimeException(String exMessage) {
        super(exMessage);
    }
}
