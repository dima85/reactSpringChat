package com.doodle.chatapi;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Controller
public class ChatController {
	
	private final MessageRepository repository;
	
	public ChatController(MessageRepository repository) {
		this.repository = repository;
	}
	
	@MessageMapping("/new-message")
	@SendTo("/topic/chat")
	public Message submitMessage(Message message) throws Exception {
		message.setCreated(new Date());
		return repository.save(message);
	}
}