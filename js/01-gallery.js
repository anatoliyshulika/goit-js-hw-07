import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
let instance;

function createGallery(galleryItems) {
  const gallery = [];

  galleryItems.forEach((element) => {
    const { preview, original, description } = element;
    const itemImg = document.createElement("img");
    itemImg.classList.add("gallery__image");
    itemImg.src = preview;
    itemImg.setAttribute("data-source", original);
    itemImg.alt = description;

    const itemA = document.createElement("a");
    itemA.classList.add("gallery__link");
    itemA.href = original;
    itemA.append(itemImg);

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("gallery__item");
    itemDiv.append(itemA);

    gallery.push(itemDiv);
  });
  return gallery;
}

function closeLightbox(evt) {
  if ("Escape" === evt.code) {
    instance.close();
    document.removeEventListener("keydown", closeLightbox);
  }
}

function onGalleryItem(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  instance = basicLightbox.create(`
    <img src= ${evt.target.dataset.source} >
`);
  instance.show();

  document.addEventListener("keydown", closeLightbox);
}

const containerGallery = document.querySelector(".gallery");
containerGallery.append(...createGallery(galleryItems));
containerGallery.addEventListener("click", onGalleryItem);
