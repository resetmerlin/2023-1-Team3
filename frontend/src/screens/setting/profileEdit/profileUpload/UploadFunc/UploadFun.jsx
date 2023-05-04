import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

export const imageCropHandler = (mediaWidth, mediaHeight, aspect) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 1080,
        height: 1920,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

export const onImageLoad = (e, aspect) => {
  if (aspect) {
    const { width, height } = e.currentTarget;
    imageCropHandler(width, height, aspect);
  }
};

export const cropImageHandler = (completedCrop, canvasRef, imgRef) => {
  if (completedCrop) {
    const croppedImage = createTempCanvas(completedCrop, canvasRef, imgRef);

    return croppedImage;
  }
};

export const createTempCanvas = (completedCrop, canvasRef, imgRef) => {
  const canvas = canvasRef.current;
  canvas.width = completedCrop.width;
  canvas.height = completedCrop.height;

  onDrawCroppedCanvas(completedCrop, canvas, imgRef);
  return canvas;
};

export const onDrawCroppedCanvas = (completedCrop, canvas, imgRef) => {
  const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
  const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    imgRef.current,
    completedCrop.x * scaleX,
    completedCrop.y * scaleY,
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
    0,
    0,
    completedCrop.width,
    completedCrop.height
  );

  return canvas;
};

export const checkIsBlob = (imgFile) => {
  return imgFile instanceof Blob;
};
