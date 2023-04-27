export const imageFormatHandler = (file) => {
  const isPNG = file.type === "image/png";
  if (!isPNG) {
    alert("This is not png file");
  }
  return isPNG;
};

// 1080 1090
