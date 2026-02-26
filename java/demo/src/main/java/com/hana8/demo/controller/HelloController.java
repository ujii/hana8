package com.hana8.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class HelloController {
	public HelloController() {
		log.debug("Constructor of HelloController!");
	}
	// private static final Logger log = LoggerFactory.getLogger(HelloController.class);

	@RequestMapping("/")
	public String index(@RequestHeader("User-Agent") String userAgent) {
		return "Hana8 Springboot Demo" + userAgent;
	}

	@GetMapping("/hello")
	public String hello() {
		return "Hello, World!";
	}

	@GetMapping("/hello-servlet")
	public String helloServlet(String name) {
		log.info("INFO: {} - {}", name, 123);
		log.debug("DEBUG: ");
		log.warn("WARN: www");
		log.error("Error!!");
		return "Hello~" + name + "!!";
	}

}
