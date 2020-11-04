'use strict';

(() => {
  const IMAGE_FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const DEFAULT_IMG_SRC = `img/muffin-grey.svg`;

  const setImagePreview = (fileInput, preview) => {
    const file = fileInput.files[0];
    const fileType = file.type.toLowerCase();

    const matches = IMAGE_FILE_TYPES.some((ending) => {
      return fileType.endsWith(ending);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        if (preview.tagName.toLowerCase() !== `img`) {
          const newImg = document.createElement(`img`);
          newImg.style.width = getComputedStyle(preview).width;
          newImg.style.height = getComputedStyle(preview).height;
          newImg.alt = `Фотография жилья`;
          newImg.src = reader.result;
          preview.appendChild(newImg);
        } else {
          preview.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  const removeImagePreview = (preview) => {
    if (preview.tagName.toLowerCase() !== `img`) {
      preview.innerHTML = ``;
    } else {
      preview.src = DEFAULT_IMG_SRC;
    }
  };

  window.image = {
    setImagePreview,
    removeImagePreview,
  };
})();
