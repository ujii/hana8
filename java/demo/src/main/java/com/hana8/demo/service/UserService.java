package com.hana8.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hana8.demo.dto.User;
import com.hana8.demo.repository.UserRepository;

@Service
public class UserService {
	private UserRepository repository;

	public List<User> getUsers() {
		return repository.findAllUsers();
	}
}
