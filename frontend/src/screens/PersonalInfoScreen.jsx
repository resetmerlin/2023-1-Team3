import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { PersonalInfoFormHook } from "../hooks/FormHoooks";
import { personalInfoSchema } from "../components/Form/Schema";
import { DefaultBackHeader } from "../components/Header";
import { personalInfoEditAction } from "../actions/securityEditAction";

const PersonalInfoScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 유저의 정보 */
  // const personalUserInfo = useSelector((state) => state.personalUserInfo);
  // const { loading, error, personalUserStatus } = personalUserInfo;
  //  const user = personalUserStatus?.user;
  const user = null;

  const backgroundImage = {
    backgroundImage:
      user == null
        ? `url('../default/default-men.png')`
        : user?.image == "DEFAULT" && user?.gender == "MALE"
        ? `
url('../default/default-men.png')`
        : user?.image == "DEFAULT" && user?.gender == "FEMALE"
        ? `
url('../default/default-women.png')`
        : `
url(${user?.image}`,
  };
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
        />
      </PersonalInfoContent>
    </PersonalInfo>
  );
};

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
