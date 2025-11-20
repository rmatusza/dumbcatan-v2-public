package com.dumbcatanv2.dumb_catan_v2_server.advice;

import com.dumbcatanv2.dumb_catan_v2_server.websocket.dto.response.ErrorMessage;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalMessageExceptionHandler {

    @MessageExceptionHandler(MessagingException.class)
    @SendToUser("/queue/errors") // Will send to /user/{username}/queue/errors
    public ErrorMessage handleMessagingError(MessagingException ex) {
        return new ErrorMessage(ex.getMessage());
    }
}
