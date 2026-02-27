package com.hana8.demo.post;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.context.annotation.Primary;

// @Repository
@Primary
public class PostRepositoryImpl implements PostRepository {
	// 위키처럼 한 사용자가 여러 글을 쓰는 경우는 Hash Table 사용
	// Hash Table의 method는 synchronize하기 때문에 thread-safe
	// private final Map<Long, Post> posts = new HashMap<>();

	private final List<Post> posts = new ArrayList<>();

	@Override
	public List<Post> findAll() {
		// return this.posts.values().stream().toList();
		return posts;
	}

	@Override
	public Post find(Long id) {
		// return this.posts.get(id);
		return posts.stream().filter(post -> post.getId() == id).findFirst().orElse(null);
	}

	@Override
	public Post createPost(PostDTO post) {
		// Long id = posts.keySet().stream().max(Long::compareTo).orElse(0L) + 1;
		// Post newer = new Post();
		// newer.setId(id);
		// newer.setTitle(post.getTitle());

		Long id = posts.stream().max(Comparator.comparingLong(Post::getId)).orElse(null).getId() + 1L;

		Post newer = Post.builder().id(id).title(post.getTitle()).body(post.getBody()).writer(post.getWriter()).build();

		// posts.put(id, newer);
		posts.add(newer);

		return newer;
	}

	@Override
	public Post updatePost(PostDTO post) {
		// Post oldPost = posts.get(post.getId());
		Post oldPost = posts.stream().filter(op -> op.getId() == post.getId()).findFirst().get();
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
