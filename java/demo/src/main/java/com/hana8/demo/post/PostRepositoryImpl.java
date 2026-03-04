package com.hana8.demo.post;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.context.annotation.Primary;

// @Repository
@Primary
public class PostRepositoryImpl implements PostsRepository {
	// 위키처럼 한 사용자가 여러 글을 쓰는 경우는 Hash Table 사용
	// Hash Table의 method는 synchronize하기 때문에 thread-safe
	// private final Map<Long, Posts> posts = new HashMap<>();

	private final List<Posts> posts = new ArrayList<>();

	@Override
	public List<Posts> findAll() {
		// return this.posts.values().stream().toList();
		return posts;
	}

	@Override
	public Posts find(Long id) {
		// return this.posts.get(id);
		return posts.stream().filter(post -> post.getId() == id).findFirst().orElse(null);
	}

	@Override
	public Posts createPost(PostsDTO post) {
		// Long id = posts.keySet().stream().max(Long::compareTo).orElse(0L) + 1;
		// Posts newer = new Posts();
		// newer.setId(id);
		// newer.setTitle(post.getTitle());

		Long id = posts.stream().max(Comparator.comparingLong(Posts::getId)).orElse(null).getId() + 1L;

		Posts newer = Posts.builder()
			.id(id)
			.title(post.getTitle())
			.body(post.getBody())
			.writer(post.getWriter())
			.build();

		// posts.put(id, newer);
		posts.add(newer);

		return newer;
	}

	@Override
	public Posts updatePost(PostsDTO post) {
		// Posts oldPost = posts.get(post.getId());
		Posts oldPost = posts.stream().filter(op -> op.getId() == post.getId()).findFirst().get();
		oldPost.setTitle(post.getTitle());
		oldPost.setBody(post.getBody());
		// oldPost.setWriter(post.getWriter());
		oldPost.setWriter(post.getWriter());

		return oldPost;
	}

	@Override
	public int deletePost(Long id) {
		// if (!posts.containsKey(id))
		if (posts.stream().noneMatch(post -> post.getId() == id))
			return 0;
		posts.remove(id);
		return 1;
	}
}
