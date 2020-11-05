'use strict';

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
        preview.style.backgroundSize = `contain`;
        preview.style.backgroundImage = `url(${reader.result})`;
      } else {
        preview.src = reader.result;
      }
    });

    reader.readAsDataURL(file);
  }
};

const removeImagePreview = (preview) => {
  if (preview.tagName.toLowerCase() !== `img`) {
    preview.style.backgroundImage = ``;
  } else {
    preview.src = DEFAULT_IMG_SRC;
  }
};

window.upload = {
  setImagePreview,
  removeImagePreview,
};
