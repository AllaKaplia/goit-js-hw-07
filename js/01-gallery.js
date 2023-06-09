import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const markupGallery = galleryItems.map(({preview, original, description}) => {
    return`
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
});

galleryEl.insertAdjacentHTML('beforeend', markupGallery.join(''));
galleryEl.addEventListener('click', onGalleryElementClick);


function onGalleryElementClick(evt) {
    const { target } = evt;
    if(!target.classList.contains('gallery__image')){
        return;
    }

    if (target.matches('img')) {
        evt.preventDefault();
    }

    const sourceImage = target.dataset.source ?? target.closest('img').dataset.source;
    const currentOriginal = galleryItems.find(({original}) => original === sourceImage);

    const instance = basicLightbox.create(`
        <img src="${evt.target.dataset.source}" width="800" height="600">
    `,  {
        onShow: () => window.addEventListener('keydown', onEscapeCodeClick),
        onClose: () => window.removeEventListener('keydown', onEscapeCodeClick),
    });

    instance.show();

    function onEscapeCodeClick(evt) {
        if(evt.code === 'Escape'){
            instance.close();
        }
    }
}
