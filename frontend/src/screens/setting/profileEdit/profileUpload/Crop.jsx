import React from "react";
import "react-image-crop/dist/ReactCrop.css";

const Crop = ({ readFileImage }) => {
  return (
    <div className="Crop-Controls">
      <label
        for="profile"
        className="profileEdit__content__profile__camera center"
      >
        <box-icon
          type="solid"
          name="camera"
          size="1.5rem"
          color="black"
        ></box-icon>
      </label>
      <input
        type="file"
        name="profile"
        id="profile"
        accept="image/*"
        style={{ display: "none" }}
        onChange={readFileImage}
      />
    </div>
  );
};

export default Crop;
