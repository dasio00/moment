const form = document.getElementById("postForm");
const content = document.getElementById("content");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const feed = document.getElementById("feed");

let selectedImage = null;

// 이미지 선택
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    selectedImage = e.target.result;
    preview.innerHTML = `<img src="${selectedImage}" class="preview-img">`;
  };
  reader.readAsDataURL(file);
});

// 글 작성
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!content.value.trim() && !selectedImage) return;

  const post = document.createElement("div");
  post.className = "post";

  post.innerHTML = `
    <p>${content.value}</p>
    ${selectedImage ? `<img src="${selectedImage}" class="post-img">` : ""}
  `;

  feed.prepend(post);

  // 초기화
  content.value = "";
  selectedImage = null;
  preview.innerHTML = "";
  imageInput.value = "";
});
