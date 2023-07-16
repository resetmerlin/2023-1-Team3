import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { styled } from "styled-components";
import { SettingHeader } from "../../components/Header";
import { batch, useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userAction";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import { SECURITY_GET_PERSONALINFO_RESET } from "../../constants/securityEditConstants";
import Loading from "../../components/Loading";
import SettingScreenView from "./SettingScreenView";
import { getImageSrc } from "../../func/commonLogicHelper";
import SettingScreenSkeleton from "./skeleton/SettingScreenSkeleton";
const SettingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 비밀번호 재설정 후 받는 response값 */
  const personalInfo = useSelector((state) => state.personalInfo);

  const { error, loading, personalInfoStatus: user } = personalInfo;

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    batch(async () => {
      await dispatch({ type: SECURITY_GET_PERSONALINFO_RESET });
      dispatch(getPersonalInfoAction());
    });
  }, []);

  const props = {
    profileProps: {
      memberId: user?.memberId,
      imgSrc: getImageSrc(user),
      name: user?.name,
      age: new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1,
      department: user?.department,
    },
    introductionProps: {
      introduction: user?.introduction,
    },
    accountProps: {
      logoutHandler: logoutHandler,
    },
  };

  return (
    <Setting>
      <SettingHeader navigate={navigate} name={"마이페이지"} />
      {loading ? <SettingScreenSkeleton /> : <SettingScreenView {...props} />}
      <Footer />
    </Setting>
  );
};

const Setting = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  align-self: start;
`;

export default SettingScreen;
