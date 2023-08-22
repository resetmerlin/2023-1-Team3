import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { styled } from 'styled-components';
import { SettingHeader } from '../../components/Header';
import { batch, useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../actions/userAction';
import { getPersonalInfoAction } from '../../actions/securityEditAction';
import { SECURITY_GET_PERSONALINFO_RESET } from '../../constants/securityEditConstants';
import SettingScreenView from './SettingScreenView';
import { getImageSrc } from '../../func/commonLogicHelper';
import SettingScreenSkeleton from './skeleton/SettingScreenSkeleton';
import MyCard from '../../components/Card/MyCard';
import CardDetails from '../../components/PopupCard/CardDetails';
import { getSaveListAction } from '../../actions/saveAction';
import './Setting.scss';

const SettingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 비밀번호 재설정 후 받는 response값 */
  const personalInfo = useSelector((state) => state.personalInfo);

  const { loading, personalInfoStatus: user } = personalInfo;

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    batch(async () => {
      await dispatch({ type: SECURITY_GET_PERSONALINFO_RESET });
      dispatch(getPersonalInfoAction());
      dispatch(getSaveListAction(0));
    });
  }, []);

  /** 자식 Popup boolean을 체크 후 style를 props로 주기위한 state */
  const [userCardPopup, setUserCardPopup] = useState(false);
  const [cardDetailsPopup, setCardDetailsPopup] = useState(false);

  const popupStyle = { display: userCardPopup ? 'none' : 'flex' };
  const age =
    new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

  /** checked state(true or false)를 parameter로 받아 state로 저장 */
  const getPopupStateFromChild = useCallback(
    (e) => {
      setUserCardPopup(e.target.checked);
    },
    [setUserCardPopup]
  );

  const imgURL = getImageSrc(user);

  const props = {
    memberId: user?.memberId,
    getPopupStateFromChild: getPopupStateFromChild,
    imgSrc: imgURL,
    name: user?.name,
    age: age,
    department: user?.department,
    introduction: user?.introduction,
    logoutHandler: logoutHandler,
  };

  const cardProps = {
    user: user,
    imageSrc: imgURL,
    goBackToScreen: () => setUserCardPopup(false),
    goBackToSlide: () => setCardDetailsPopup(false),

    popupCheckedHandler: (e) => {
      setCardDetailsPopup(e.target.checked);
    },
    popupStyle: popupStyle,
    age: age,
  };
  return (
    <>
      <section className="setting">
        <SettingHeader navigate={navigate} name={'마이페이지'} />
        {loading ? <SettingScreenSkeleton /> : <SettingScreenView {...props} />}

        <Footer />
      </section>
      {userCardPopup && (
        <MyCardBackground>
          {cardDetailsPopup ? (
            <CardDetails {...cardProps} />
          ) : (
            <MyCard {...cardProps} />
          )}
        </MyCardBackground>
      )}
    </>
  );
};

const MyCardBackground = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    box-shadow: none;
  }
`;
export default SettingScreen;
