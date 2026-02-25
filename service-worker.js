<script>
const form = document.getElementById("postForm");
const content = document.getElementById("content");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const feed = document.getElementById("feed");

let selectedImage = null;

/* =========================
   이미지 선택
========================= */
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

/* =========================
   포스트 생성 함수 (스와이프 삭제 포함)
========================= */
function createPostElement(text, image) {
  const wrapper = document.createElement("div");
  wrapper.className = "post-wrapper";

  const deleteBg = document.createElement("div");
  deleteBg.className = "delete-bg";
  deleteBg.innerText = "삭제";

  const post = document.createElement("div");
  post.className = "post";

  post.innerHTML = `
    <p>${text}</p>
    ${image ? `<img src="${image}" class="post-img">` : ""}
  `;

  wrapper.appendChild(deleteBg);
  wrapper.appendChild(post);

  /* =========================
     스와이프 로직
  ========================= */
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  post.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  post.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;

    currentX = e.touches[0].clientX;
    let diff = currentX - startX;

    if (diff < 0) {
      post.style.transform = `translateX(${diff}px)`;
    }
  });

  post.addEventListener("touchend", () => {
    isSwiping = false;
    let diff = currentX - startX;

    if (diff < -80) {
      // 삭제 애니메이션
      post.style.transform = "translateX(-100%)";
      setTimeout(() => {
        wrapper.remove();
      }, 200);
    } else {
      post.style.transform = "translateX(0)";
    }
  });

  return wrapper;
}

/* =========================
   글 작성
========================= */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!content.value.trim() && !selectedImage) return;

  const postElement = createPostElement(content.value, selectedImage);
  feed.prepend(postElement);

  content.value = "";
  selectedImage = null;
  preview.innerHTML = "";
  imageInput.value = "";
});
</script>
