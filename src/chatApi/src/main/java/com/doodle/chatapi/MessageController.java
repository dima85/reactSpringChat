package com.doodle.chatapi;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("messages")
@CrossOrigin
public class MessageController {
	
	private final MessageRepository repository;
	
	public MessageController(MessageRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/")
	public List<Message> all() {
		return repository.findByOrderByCreatedAsc();
//		return repository.findAll(PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "created"))).toList();
	}
	
	@PostMapping("/")
	public Message newMessage(@RequestBody Message newMessage) {
		newMessage.setCreated(new Date());
		return repository.save(newMessage);
	}
}