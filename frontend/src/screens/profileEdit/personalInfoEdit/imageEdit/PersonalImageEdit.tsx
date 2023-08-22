import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { styled } from 'styled-components';
import 'react-image-crop/dist/ReactCrop.css';
import { AfterRegisterImageInput } from '../../../../components/Input/Input';
import { profileEditAction } from '../../../../actions/securityEditAction';
import { checkIsBlob, cropImageHandler } from '../../../../hooks/ImageHandle';
import { profileInput } from '../../../../components/Input/InputsDefine';
import { ButtonLoading } from '../../../../components/Loader';
import { ButtonChecked } from '../../../../components/Checked';
import Button from '../../../../components/atoms/button/InstanceMaker';

const PersonalImageEdit = ({
  dispatch,
  getPersonalInfoAction,
  profileEditInfo,
}) => {
  const canvasRef = useRef('');
  const imgRef = useRef(null);

  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState('');
  const [completedCrop, setCompletedCrop] = useState('');
  const aspect = 0.69 / 1;
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
          unit: 'px',
          width: 408,
          height: 591.09,
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
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const sendImageToServer = () => {
    if (completedCrop && canvasRef && imgRef) {
      const croppedImage = cropImageHandler(completedCrop, canvasRef, imgRef);
      croppedImage.toBlob((blob) => {
        if (checkIsBlob(blob)) {
          handleImageUpload(blob);
        }
      });
    }
  };

  /** 최종 이미지를 압축하고 서버에 전송하는 함수 */
  const handleImageUpload = async (imgFile) => {
    const options = {
      maxSizeMB: 5,
      fileType: 'image/jpeg',
      maxWidthOrHeight: 620,
      useWebWorker: true,
      quality: 1.0,
    };
    try {
      const compressedFile = await imageCompression(imgFile, options);

      /** 압축된 Cropped 이미지를 서버에 보냄 */
      await dispatch(profileEditAction(compressedFile));
      dispatch(getPersonalInfoAction());
    } catch (error) {
      throw new Error(error);
    }
  };

  const imageUploadHandler = async () => {
    await sendImageToServer();
  };
  return (
    <>
      {imgSrc && (
        <SetImageDefault
          type="button"
          onClick={() => {
            setImgSrc('');
          }}
        >
          <box-icon name="x" color="black" size="3rem"></box-icon>
        </SetImageDefault>
      )}

      <ProfileEditWrap>
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
            style={{ height: '26rem', width: '100%' }}
            crop={crop}
            onChange={(crop, _) => {
              setCrop(crop);
            }}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              style={{ height: '100%', width: '100%', scale: '1' }}
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <canvas
            style={{ display: 'none' }}
            ref={canvasRef}
            width={completedCrop.width}
            height={completedCrop.width}
          ></canvas>
        )}
        <Button size="xl" onClick={imageUploadHandler}>
          {profileEditInfo?.loading === true ? (
            <ButtonLoading />
          ) : profileEditInfo?.loading === false &&
            profileEditInfo?.profileEditStatus ? (
            <ButtonChecked />
          ) : (
            '프로필 이미지로 설정'
          )}
        </Button>
      </ProfileEditWrap>
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
  position: absolute;
  top: 4%;
  right: 3%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

const ProfileEditWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  top: 8%;
  padding: 0 1.5rem;
  z-index: 0;
  margin-top: 2rem;
  button {
    margin-top: 2rem;
  }
`;

export default PersonalImageEdit;
