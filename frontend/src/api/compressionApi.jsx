import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { profileEditAction } from "../actions/securityEditAction";

import imageCompression from "browser-image-compression";

const CompressionApi = ({ sendImageToServer }) => {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState("");
  const [completedCrop, setCompletedCrop] = useState("");
  const [imgFile, setImgFile] = useState("");
  const dispatch = useDispatch();
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

  const canvasRef = useRef("");
  const onDownloadCropClick = async () => {
    if (!completedCrop) {
      throw new Error("Crop canvas does not exist");
    }
    const canvas = canvasRef.current;
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
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
    canvas.toBlob((blob) => {
      handleImageUpload(blob);
    });
  };

  const handleImageUpload = async (imgFile) => {
    console.log("originalFile instanceof Blob", imgFile instanceof Blob); // true
    console.log(`originalFile size ${imgFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 5,
      fileType: "image/png",
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imgFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true

      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      dispatch(profileEditAction(compressedFile));
    } catch (error) {
      console.log(error);
    }
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

          <canvas
            style={{ display: "none" }}
            ref={canvasRef}
            width={completedCrop.width}
            height={completedCrop.width}
          ></canvas>
        </>
      )}
    </div>
  );
};

export default CompressionApi;
