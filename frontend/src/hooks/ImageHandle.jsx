/** 프로필에 맞게 잘라진 이미지를 canvas에 그리는 함수 */
export const cropImageHandler = (completedCrop, canvasRef, imgRef) => {
  if (completedCrop) {
    const croppedImage = canvasRef.current;
    croppedImage.width = completedCrop.width;
    croppedImage.height = completedCrop.height;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const ctx = croppedImage.getContext("2d");

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
    return croppedImage;
  }
};
/** 최종 이미지 파일이 Blob 타입인지 확인하는 함수 */
export const checkIsBlob = (imgFile) => {
  return imgFile instanceof Blob;
};
