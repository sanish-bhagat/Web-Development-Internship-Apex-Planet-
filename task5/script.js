// Dark/Light Mode Toggle
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  const btn = document.querySelector("nav button i");
  if (document.body.classList.contains("dark-mode")) {
    btn.classList.replace("fa-moon", "fa-sun");
  } else {
    btn.classList.replace("fa-sun", "fa-moon");
  }
}

// Search and Category Filter Logic
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const articles = document.querySelectorAll(".article-card");

function filterArticles() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  articles.forEach((article) => {
    const title = article.querySelector("h3").textContent.toLowerCase();
    const desc = article.querySelector("p")?.textContent.toLowerCase() || "";
    const imgAlt = article.querySelector("img").alt.toLowerCase();

    const matchesSearch =
      title.includes(searchText) || desc.includes(searchText) || imgAlt.includes(searchText);

    // For categories: use img alt or title keywords (simple mock)
    let matchesCategory = true;
    if (category !== "all") {
      matchesCategory = imgAlt.includes(category) || title.includes(category);
    }

    if (matchesSearch && matchesCategory) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterArticles);
categoryFilter.addEventListener("change", filterArticles);

// Mock Login System
function mockLogin() {
  const usernameInput = document.getElementById("username");
  if (usernameInput.value.trim() === "") {
    alert("Please enter your name to login.");
    return;
  }
  alert(`Welcome, ${usernameInput.value}! You are now logged in.`);
  usernameInput.value = "";
}

// Comment Posting
function postComment() {
  const commentBox = document.getElementById("comment");
  const commentsContainer = document.getElementById("comments-box");

  const commentText = commentBox.value.trim();
  if (commentText === "") {
    alert("Please write a comment before posting.");
    return;
  }

  // Create new comment div
  const newComment = document.createElement("div");
  newComment.className = "comment";
  newComment.textContent = commentText;

  commentsContainer.appendChild(newComment);
  commentBox.value = "";
}