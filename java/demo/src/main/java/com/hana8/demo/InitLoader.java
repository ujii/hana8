package com.hana8.demo;

import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.hana8.demo.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitLoader implements ApplicationRunner {
	private final PostRepository postRepository;

	@Override
	public void run(@NonNull ApplicationArguments args) {
		/*
		moved to data.sql (2026-03-05)
		postRepository.save(new Post("Title1", "hong"));
		postRepository.save(new Post("Title2", "kim"));
		postRepository.save(new Post("Title3", "lee"));
		 */
	}
}
