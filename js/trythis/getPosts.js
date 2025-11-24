async function getPosts(id) {
  const postsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  const posts = await postsResponse.json();

  const promiseAll = (posts) =>
    Promise.all((resolve) => {
      const comments = [];
      posts.map(async post => )
    });
}

getPosts(1);
/*
[
    {
        postId: 게시글ID,
        title: 게시글 제목,
        comments: [댓글 목록]
    },
    { … }
]
const commentsResponse = await fetch(
  'https://jsonplaceholder.typicode.com/posts/<postId>/comments'
);
*/
