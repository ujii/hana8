// 연습문제 312p

const API = 'https://jsonplaceholder.typicode.com';
const getPostsUserId = async (userId) =>
  fetch(`${API}/posts?userId=${userId}`).then((res) => res.json());
const getCommentByPostId = async (postId) =>
  fetch(`${API}/posts/${postId}/comments`).then((res) => res.json());

async function fetchData() {
  const posts = await getPostsUserId(1);
  // console.log('🚀 ~ posts:', posts);

  const postComments = await Promise.all(
    posts.map((post) => getCommentByPostId(post.id))
  );

  const results = [];
  for (let i = 0; i < posts.length; i++) {
    const { id: postId, title } = posts[i];
    const comments = postComments[i].map(({ id, email, body }) => ({
      id,
      email,
      body,
    }));
    results.push({ postId, title, comments });
  }

  console.log('🚀 ~ results:', JSON.stringify(results, null, ' '));
}

fetchData();
