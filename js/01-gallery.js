import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
const imgContainer = document.querySelector("div.gallery");
const cardMarkup = creteImgCard(galleryItems);

imgContainer.insertAdjacentHTML("beforeend", cardMarkup);
imgContainer.addEventListener("click", onImgContainerClick);

function creteImgCard(galleryItems) {
  return galleryItems
    .map(({ preview, original }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link"
      onclick="event.preventDefault()"
      href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="Image description"
       />
      </a>
    </div>`;
    })
    .join("");
}

function onImgContainerClick(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: () => {
        
        window.addEventListener("keydown", onClickEscape);
      },
      onClose: () => window.removeEventListener("keydown", onClickEscape),
    }
  );
  const onClickEscape = (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  };
  instance.show();
}