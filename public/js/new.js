const newPosthandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="postTitle"]').value;
  const body = document.querySelector('textarea[name="postBody"]').value;

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-type": "application/json" },
  });
  document.location.replace("/dashboard");
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newPosthandler);
