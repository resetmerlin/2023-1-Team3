import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileUpload from "./profileUpload/ProfileUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  onImageLoad,
  cropImageHandler,
  checkIsBlob,
} from "./profileUpload/UploadFunc/UploadFun";
import imageCompression from "browser-image-compression";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { profileEditAction } from "../../../actions/securityEditAction";
const ProfileEditScreen = () => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState("");
  const [completedCrop, setCompletedCrop] = useState("");
  const [compressFile, setCompressFile] = useState("");

  const canvasRef = useRef("");
  const aspect = 9 / 16;

  const getImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);

      setImgSrc(imageFileReader(e));
    }
  };
  const imageFileReader = (e) => {
    const reader = new FileReader();

    reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || "")
    );

    reader.readAsDataURL(e.target.files[0]);
  };
  console.log(completedCrop);

  const sendImageToServer = () => {
    const croppedImage = cropImageHandler(completedCrop, canvasRef, imgRef);
    croppedImage.toBlob((blob) => {
      if (checkIsBlob(blob)) {
        handleImageUpload(blob);
      }
    });
  };

  const handleImageUpload = async (imgFile) => {
    const options = {
      maxSizeMB: 5,
      fileType: "image/png",
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imgFile, options);
      dispatch(profileEditAction(compressedFile));
      //compressedFiled을 store할 수 없음.. 왜?
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="profileEdit">
      <div className="profileEdit__top center">
        <Link to="/setting">
          <box-icon name="arrow-back" color="rgb(196, 196, 196)"></box-icon>
          <span>Setting</span>
        </Link>
        <span className="profileEdit__top__center center">프로필 설정</span>
        <button
          className="profileEdit__top__checked"
          onClick={sendImageToServer}
        >
          <box-icon
            name="check"
            color="rgb(196, 196, 196)"
            size="2.3rem"
          ></box-icon>
        </button>
      </div>

      <ProfileUpload readFileImage={getImageHandler} />
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(crop, _) => {
            setCrop(crop);
          }}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={(e) => {
              setCrop(onImageLoad(e, aspect));
            }}
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
      <div className="profileEdit__main">
        <div className="profileEdit__main__information">
          <div className="profileEdit__main__information__name">
            <box-icon
              type="solid"
              name="pencil"
              color="white"
              size="2rem"
              style={{ marginRight: ".6rem" }}
            ></box-icon>
            {/* <label htmlFor="profile-edit-information">Chole,24</label> */}
            <input
              type="text"
              id="profile-edit-information"
              placeholder="James linn"
            />
          </div>

          <div className="profileEdit__main__information__desc">
            <div className="profileEdit__main__information__desc__wrap">
              <box-icon
                type="solid"
                name="pencil"
                color="white"
                style={{ marginRight: ".4rem" }}
              ></box-icon>

              <input
                type="text"
                id="profile-edit-information"
                placeholder="DKU Computer-Science
        "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileEditScreen;
