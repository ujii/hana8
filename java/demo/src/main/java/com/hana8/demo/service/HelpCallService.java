package com.hana8.demo.service;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class HelpCallService implements GreetingService {

	private final HelloService service;

	@Autowired
	public void setService(HelloService service) {
		this.service = service;
	}

	@Override
	public String call() {
		return "Help Call Service!";
	}

	@Override
	public String sayHello() {
		return service.sayHello();
	}
}
