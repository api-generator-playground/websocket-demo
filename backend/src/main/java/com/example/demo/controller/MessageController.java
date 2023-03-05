package com.example.demo.controller;

import com.example.demo.websocket.ServerWebSocketHandler;
import com.example.demo.websocket.WebSocketConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.WebSocketHandler;

import java.io.IOException;

@Controller
@RequestMapping("/send")
@Slf4j
public class MessageController {

    @Autowired
    ServerWebSocketHandler webSocketHandler;

    @GetMapping(value = "/sendText")
    public ResponseEntity<?> sendMessage(@RequestBody String messageText) {
        webSocketHandler.sendMessage(messageText);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/sendObject")
    public ResponseEntity<?> sendObject(@RequestBody Object object) {
        webSocketHandler.sendObject(object);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
