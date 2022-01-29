const commentForm = async function (event) {
  event.preventDefault();

  const postId = document.querySelector('input[name="postId"]').value;
  const body = document.querySelector('textarea[name="commentBody"]').value

  await fetch('/api/comment', {
    method: "POST", 
    body: JSON.stringify({
      postId, 
      body
    }),
    headers: { "Content-type": "application/json" },
  })

  document.location.reload()
};

document.querySelector('.comment-form').addEventListener('submit', commentForm)
