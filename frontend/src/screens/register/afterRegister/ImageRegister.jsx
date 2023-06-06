import React, { useState, useRef } from "react";
import { profileInput } from "../../../components/Input/InputsDefine";
import { AfterRegisterImageInput } from "../../../components/Input/Input";
import { ImageRegisterButton } from "../../../components/Button";
import imageCompression from "browser-image-compression";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { styled } from "styled-components";
import { checkIsBlob, cropImageHandler } from "../../../hooks/ImageHandle";
import { profileEditAction } from "../../../actions/securityEditAction";
import "react-image-crop/dist/ReactCrop.css";

const ImageRegister = ({ handleNext, dispatch }) => {
  const canvasRef = useRef("");
  const imgRef = useRef(null);

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState("");
  const [completedCrop, setCompletedCrop] = useState("");
  const aspect = 9 / 16;
  /** 이미지를 로드하여 자동으로 crop해주는 함수 */
  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(imageCropHandler(width, height, aspect));
    }
  };

  /** 이미지 사이즈를 자동으로 조절해주는 함수 */
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
  const getImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);

      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const sendImageToServer = () => {
    const croppedImage = cropImageHandler(completedCrop, canvasRef, imgRef);
    croppedImage.toBlob((blob) => {
      if (checkIsBlob(blob)) {
        handleImageUpload(blob);
      }
    });
  };

  /** 최종 이미지를 압축하고 서버에 전송하는 함수 */
  const handleImageUpload = async (imgFile) => {
    const options = {
      maxSizeMB: 5,
      fileType: "image/png",
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imgFile, options);

      /** 압축된 Cropped 이미지를 서버에 보냄 */
      dispatch(profileEditAction(compressedFile));
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <SetImageDefault
        type="button"
        onClick={() => {
          setImgSrc("");
        }}
      >
        <box-icon name="x" color="black" size="3rem"></box-icon>
      </SetImageDefault>

      {!imgSrc && (
        <>
          <ImageLabel>프로필 이미지를 정해주세요</ImageLabel>
          <AfterRegisterImageInput
            input={profileInput}
            readFileImage={getImageHandler}
          />
        </>
      )}

      {!!imgSrc && (
        <ReactCrop
          style={{ height: "26rem", width: "100%" }}
          crop={crop}
          onChange={(crop, _) => {
            setCrop(crop);
          }}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            style={{ height: "100%", scale: "1" }}
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <canvas
          style={{ display: "none" }}
          ref={canvasRef}
          width={completedCrop.width}
          height={completedCrop.width}
        ></canvas>
      )}

      <ImageRegisterButton
        handleNext={handleNext}
        sendImageToServer={sendImageToServer}
        content={imgSrc ? "프로필 이미지로 설정" : "건너뛰기"}
      />
    </>
  );
};
const ImageLabel = styled.span`
  margin: 0rem 0.5rem 3rem 0;
  font-weight: 600;
  color: rgb(128, 113, 252);
  font-size: 1rem;
`;

const SetImageDefault = styled.button`
  position: fixed;
  top: 3.3%;
  right: 3%;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default ImageRegister;
