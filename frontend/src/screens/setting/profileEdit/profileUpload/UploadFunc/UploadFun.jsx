import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

/** 이미지 사이즈를 자동으로 조절해주는 함수 */
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

/** 프로필에 맞게 잘라진 이미지를 canvas에 그리는 함수 */
export const cropImageHandler = (completedCrop, canvasRef, imgRef) => {
  if (completedCrop) {
    const croppedImage = onDrawCroppedCanvas(completedCrop, canvasRef, imgRef);

    return croppedImage;
  }
};

// /** 프로필에 맞게 잘라진 이미지를 canvas에 그리는 함수 */
// export const createTempCanvas = (completedCrop, canvasRef, imgRef) => {
//   const canvas = canvasRef.current;
//   canvas.width = completedCrop.width;
//   canvas.height = completedCrop.height;

//   onDrawCroppedCanvas(completedCrop, canvas, imgRef);
//   return canvas;
// };

/** Canvas에 Crop한 이미지를 새로 그리는 함수*/
export const onDrawCroppedCanvas = (completedCrop, canvasRef, imgRef) => {
  const canvas = canvasRef.current;
  canvas.width = completedCrop.width;
  canvas.height = completedCrop.height;

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

/** 최종 이미지 파일이 Blob 타입인지 확인하는 함수 */
export const checkIsBlob = (imgFile) => {
  return imgFile instanceof Blob;
};
