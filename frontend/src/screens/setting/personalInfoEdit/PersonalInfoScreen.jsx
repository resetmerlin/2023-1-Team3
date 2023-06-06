import React, { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { PersonalInfoFormHook } from "../../../hooks/FormHoooks";
import { personalInfoSchema } from "../../../components/Form/Schema";
import { DefaultBackHeader } from "../../../components/Header";
import {
  getPersonalInfoAction,
  personalInfoEditAction,
} from "../../../actions/securityEditAction";
import { ChangeProfileButton } from "../../../components/Button";
import {
  SECURITY_GET_PERSONALINFO_RESET,
  SECURITY_PERSONALINFO_RESET,
} from "../../../constants/securityEditConstants";
import PersonalImageEdit from "./imageEdit/PersonalImageEdit";
import { BackFormButton } from "../../../components/Button";

const PersonalInfoScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalInfo = useSelector((state) => state.personalInfo);
  const personalEditInfo = useSelector((state) => state.personalEditInfo);
  const { personalInfoStatus: user } = personalInfo;

  useEffect(() => {
    batch(async () => {
      await dispatch({ type: SECURITY_PERSONALINFO_RESET });
      dispatch({ type: SECURITY_GET_PERSONALINFO_RESET });

      dispatch(getPersonalInfoAction());
    });
  }, []);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    `url('./default/default-men.png')`
  );

  useEffect(() => {
    if (user?.image) {
      setBackgroundImageUrl(
        user?.image == "DEFAULT" && user?.gender == "MALE"
          ? `url('./default/default-men.png')`
          : user?.image == "DEFAULT" && user?.gender == "FEMALE"
          ? `url('./default/default-women.png')`
          : `url(${user?.image})`
      );
    }
  }, [user?.image, user?.gender]);

  const onSubmit = async (data) => {
    await dispatch(
      personalInfoEditAction({
        department: data.major,
        introduction: data.description,
        name: data.name,
        gender: data.gender,
        birth: data.birthday?.toISOString().split("T")[0],
      })
    );
  };

  const [changeProfile, setChangeProfile] = useState(false);

  const handleChangeProfile = useCallback(() => {
    setChangeProfile((prev) => !prev);
  });
  return (
    <PersonalInfo>
      {!changeProfile ? (
        <DefaultBackHeader navigate={navigate} />
      ) : (
        <GoBackToProfile>
          {" "}
          <BackFormButton handlePrevious={handleChangeProfile} />
        </GoBackToProfile>
      )}

      <PersonalInfoImage
        style={{
          backgroundImage: backgroundImageUrl,
          display: changeProfile && "none",
        }}
      ></PersonalInfoImage>
      {changeProfile && (
        <PersonalImageEdit
          dispatch={dispatch}
          getPersonalInfoAction={getPersonalInfoAction}
        />
      )}

      <PersonalInfoContent style={{ display: changeProfile && "none" }}>
        <PersonalInfoFormHook
          schema={personalInfoSchema}
          info={personalEditInfo}
          onSubmit={onSubmit}
          user={user}
        />
      </PersonalInfoContent>

      <PersonalInfoButtonWrap>
        {!changeProfile && (
          <ChangeProfileButton handleChangeProfile={handleChangeProfile} />
        )}

        {/* <SaveProfileButton /> */}
      </PersonalInfoButtonWrap>
    </PersonalInfo>
  );
};
const PersonalInfoButtonWrap = styled.div`
  width: auto;
  // width: 12rem;

  height: auto;
  position: absolute;
  top: 43%;
  right: 3%;
  display: flex;
  justify-content: space-between;
`;

const PersonalInfo = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  align-self: start;
`;

const GoBackToProfile = styled.div`
  position: fixed;
  top: 4%;
  left: 3%;
  z-index: 1000;
`;

const PersonalInfoImage = styled.img`
  height: 48%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-repeat: none;
  background-size: cover;
  background-position: center;
`;

const PersonalInfoContent = styled.div`
  height: 52%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default PersonalInfoScreen;
