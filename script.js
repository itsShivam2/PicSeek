const accessToken = "vqiZ3qIUGEe9ZXGIrI4yaqkKtcblHs1E1anOINErPAU";
let images;

let searchQuery;
const defaultQuery = "office";
let page = 1;
let totalResults;
let totalPages;

const searchInput = document.querySelector("#search-box");
searchInput.addEventListener("change", function (e) {
  searchQuery = e.target.value;
});

function fetchImages(page = 1) {
  const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(
    searchQuery || defaultQuery
  )}`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      images = data.results;
      totalResults = data.total;
      totalPages = data.total_pages;
      console.log(data);
      displayImages(images);
    })
    .catch((error) => console.error("Error:", error));
}
// fetchImages();

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", fetchImages);

function displayImages(images) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  images.forEach((image) => {
    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "image-container");

    const imageElement = document.createElement("img");
    imageElement.setAttribute("class", "image");
    imageElement.src = image.urls.regular;
    imageElement.alt = image.alt_description;

    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(overlay);

    main.appendChild(imageContainer);
  });
}

function prevPage() {
  if (page > 1) page = page - 1;
  fetchImages(page);
}
const prevImages = document.querySelector("#prev");
prevImages.addEventListener("click", prevPage);

function nextPage() {
  if (page < totalPages) page = page + 1;
  fetchImages(page);
}
const nextImages = document.querySelector("#next");
nextImages.addEventListener("click", nextPage);
