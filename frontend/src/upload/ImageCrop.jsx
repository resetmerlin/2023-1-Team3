import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { handleImageUpload } from "./imageTypeHander";
import React, { useState, useRef } from "react";
import { imgPreview } from "./imagePreview";

export default function ImageCrop() {
  // Img주소 및 정보를 가지는 state(string)

  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState("");
  const [completedCrop, setCompletedCrop] = useState("");
  const [imgFile, setImgFile] = useState("");

  const aspect = 9 / 16;

  const imageCropHandler = (mediaWidth, mediaHeight, aspect) => {
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

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(imageCropHandler(width, height, aspect));
    }
  };

  const onDownloadCropClick = async () => {
    if (!completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const canvas = document.createElement("canvas");
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");

    img.src = URL.createObjectURL(imgFile[0]);

    img.onload = () => {
      ctx.drawImage(
        img,
        completedCrop.x,
        completedCrop.y,
        completedCrop.width,
        completedCrop.height,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );
    };

    canvas.toBlob((blob) => {
      handleImageUpload(blob);
    });
  };

  const getImageFromStorage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files);
    }
  };

  return (
    <div className="ImageCrop">
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={getImageFromStorage} />
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(crop, _) => {
            setCrop(crop);
          }}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
        </ReactCrop>
      )}

      {!!completedCrop && (
        <>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
          </div>
        </>
      )}
    </div>
  );
}
