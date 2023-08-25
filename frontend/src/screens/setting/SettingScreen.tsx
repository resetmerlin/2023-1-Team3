/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { batch } from 'react-redux';
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
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import Header from '../../components/atoms/header/InstanceMaker';
import Button from '../../components/atoms/button/InstanceMaker';
import { IconChevronLeft } from '../../components/atoms/icon/IconChevron';
import Footer from '../../components/atoms/footer/InstanceMaker';

export default function SettingScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /** 비밀번호 재설정 후 받는 response값 */
  const personalInfo = useAppSelector((state) => state.personalInfo);

  /** 자식 Popup boolean을 체크 후 style를 props로 주기위한 state */
  const [userCardPopup, setUserCardPopup] = useState(false);
  const [cardDetailsPopup, setCardDetailsPopup] = useState(false);

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

  const popupStyle = { display: userCardPopup ? 'none' : 'flex' };
  const age =
    new Date().getFullYear() - new Date(user?.birth).getFullYear() + 1;

  /** checked state(true or false)를 parameter로 받아 state로 저장 */
  const getPopupStateFromChild = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserCardPopup(e.target.checked);
    },
    [setUserCardPopup]
  );

  const props = {
    memberId: user?.memberId,
    getPopupStateFromChild,
    imgSrc: getImageSrc(user),
    name: user?.name,
    age,
    department: user?.department,
    introduction: user?.introduction,
    logoutHandler,
    goBackToScreen: () => setUserCardPopup(false),
    goBackToSlide: () => setCardDetailsPopup(false),
    popupCheckedHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardDetailsPopup(e.target.checked);
    },
    popupStyle,
  };

  return (
    <>
      <section className="setting">
        <Header size="m" page="setting">
          <Button
            size="xl"
            division="icon"
            type="tertiary"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IconChevronLeft />
          </Button>
          <span className="header__title">마이페이지</span>
        </Header>
        {loading ? <SettingScreenSkeleton /> : <SettingScreenView {...props} />}
        <Footer page="setting" />
      </section>
      {userCardPopup && (
        <div className="my-card">
          {cardDetailsPopup ? (
            <CardDetails {...props} />
          ) : (
            <MyCard {...props} />
          )}
        </div>
      )}
    </>
  );
}
