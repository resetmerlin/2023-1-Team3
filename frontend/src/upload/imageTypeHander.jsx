export const imageFormatHandler = (file) => {
  const isPNG = file.type === "image/png";
  if (!isPNG) {
    alert("This is not png file");
  }
  return isPNG;
};

// 1080 1920

const downloadImage = (compressedFile) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(compressedFile);
  link.download = "compressed-image.png";
  link.click();
};
