import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { PersonalInfoFormHook } from "../hooks/FormHoooks";
import { personalInfoSchema } from "../components/Form/Schema";
import { DefaultBackHeader } from "../components/Header";
import { personalInfoEditAction } from "../actions/securityEditAction";
import {
  ChangeProfileButton,
  SaveButton,
  SaveProfileButton,
} from "../components/Button";

const PersonalInfoScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 유저의 정보 */
  // const personalUserInfo = useSelector((state) => state.personalUserInfo);
  // const { loading, error, personalUserStatus } = personalUserInfo;
  //  const user = personalUserStatus?.user;

  const memberId = 8;
  const name = "김민서";
  const gender = "MALE";
  const birth = "2000-10-03";
  const image = "DEFAULT";
  const department = "응용컴퓨터공학과";
  const introduction = "반갑습니다~ 김민서입니다!";

  const user = {
    memberId: memberId,
    name: name,
    gender: gender,
    birth: birth,
    image: image,
    department: department,
    introduction: introduction,
  };
  const backgroundImage = {
    backgroundImage:
      user?.image == "DEFAULT" && user?.gender == "MALE"
        ? `
url('../default/default-men.png')`
        : user?.image == "DEFAULT" && user?.gender == "FEMALE"
        ? `
url('../default/default-women.png')`
        : `
url(${user?.image}`,
  };
  /** 유저 나이 n살로 변경 */
  const age =
    new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

  // useEffect(()=>{
  //     dispatch(getUserInfoAction())

  // },[])\

  const onSubmit = async (data) => {
    await dispatch(
      personalInfoEditAction({
        department: data.major,
        introduction: data.description,
        name: data.name,
        birth: data.birthday?.toISOString().split("T")[0],
      })
    );
  };
  return (
    <PersonalInfo>
      <DefaultBackHeader navigate={navigate} />

      <PersonalInfoImage style={backgroundImage} />
      <PersonalInfoContent>
        <PersonalInfoFormHook
          schema={personalInfoSchema}
          error={null}
          loading={null}
          onSubmit={onSubmit}
          user={user}
        />
      </PersonalInfoContent>

      <PersonalInfoButtonWrap>
        <ChangeProfileButton />

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

const PersonalInfoImage = styled.div`
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
