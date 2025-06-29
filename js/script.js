const form = document.getElementById("image-form");
const loader = document.querySelector(".gallery__loader");
const galleryContainer = document.getElementById("gallery-container");


function showLoader() {
  loader.classList.remove("hidden");
}


function hideLoader() {
  loader.classList.add("hidden");
}


function createImageElement(src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Собачка";
  img.classList.add("gallery__img");
  return img;
}


async function fetchImages() {
  const url = "https://dog.ceo/api/breeds/image/random/40";

  try {
    showLoader();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ошибка загрузки изображений");
    }

    const data = await response.json();
    const imageUrls = data.message;

    galleryContainer.innerHTML = "";

    imageUrls.forEach((url) => {
      const imgElement = createImageElement(url);
      galleryContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert("Не удалось загрузить изображения. Попробуйте позже.");
  } finally {
    hideLoader();
  }
}


form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchImages();
});
