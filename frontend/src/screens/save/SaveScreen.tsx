import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSaveListAction } from '../../actions/saveAction';
import { blockUserAction, saveUserAction } from '../../actions/buttonAction';
import { SAVE_LIST_RESET } from '../../constants/saveConstants';
import { BUTTON_SAVE_RESET } from '../../constants/buttonConstants';
import SaveContent from './SaveContent';
import './Save.scss';
import Header from '../../components/atoms/header/InstanceMaker';
import Button from '../../components/atoms/button/InstanceMaker';
import { IconChevronLeft } from '../../components/atoms/icon/IconChevron';
import Footer from '../../components/atoms/footer/InstanceMaker';

function SaveScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 유저의 save list 정보 */
  const saveListInfo = useSelector((state) => state.saveListInfo);
  const saveInfo = useSelector((state) => state.saveInfo);
  const { saveListStatus } = saveListInfo;
  const ScrollRowRef = useRef(null);

  /** getSaveListAction parameter용 페이지 state */
  const [savePage, setSavePage] = useState(0);

  /** child component state값 저장 */
  const [childState, setChildState] = useState(false);
  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };
  /** 저장된 좋아요 한 유저 리스트 불러오고 다음 Page를 1추가 함 */
  const getSaveList = useCallback(
    async (savePage: number) => {
      await dispatch(getSaveListAction(savePage));
      setSavePage(savePage + 1);
    },
    [dispatch]
  );

  /** 서버에 유저 좋아요 state 전송  */
  const sendSaveValue = useCallback(
    (memberId: string, saveBoolean: boolean) => {
      dispatch(saveUserAction(memberId, saveBoolean));
    },
    [dispatch]
  );

  /** 유저 차단 및 삭제  */
  const sendBlockUser = useCallback(
    (memberId: string, blockBoolean: boolean) =>
      dispatch(blockUserAction(memberId, blockBoolean)),
    [dispatch]
  );

  /** 좋아요 한 리스트 값이 없을 경우 API call함 */
  useEffect(() => {
    /** 처음 Data fetch 시작 */
    if (childState === false && saveInfo?.saveStatus === true) {
      batch(() => {
        dispatch({ type: SAVE_LIST_RESET });
        dispatch({ type: BUTTON_SAVE_RESET });
      });
      getSaveList(0);
    }
  }, [saveInfo?.saveStatus, childState, batch]);

  /** 해당 페이지로 이동할때마다 서버로부터 data받아 옴*/
  useEffect(() => {
    dispatch({ type: SAVE_LIST_RESET });
    getSaveList(0);
  }, []);

  useEffect(() => {
    let targetElement = ScrollRowRef.current;

    if (saveListStatus?.endPageSignal === false && targetElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          const observedPage = entries[0];
          if (observedPage?.isIntersecting) {
            /** 새로운 유저 리스트 call */
            getSaveList(savePage);
          }
        },
        { threshold: 1 }
      );

      /** Ref로 지정한 마지막 element 관찰 */
      observer.observe(targetElement);

      return () => {
        /**  element 관찰 취소 */
        observer.unobserve(targetElement);
      };
    }
  }, [ScrollRowRef?.current, getSaveList, saveListStatus?.endPageSignal]);

  return (
    <section className="save">
      <Header page="save" size="s" popup={childState}>
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
        <div className="save-header__content">
          <span className="header__title">Like</span>
        </div>
      </Header>

      <div
        className="save__row"
        style={{
          height: childState ? '100vh' : '82vh',
          marginTop: childState && '0',
          top: childState && '0',
          overflow: childState ? 'hidden' : 'scroll',
          padding: childState && '0',
        }}
      >
        {saveListStatus?.memberResponses &&
          saveListStatus?.memberResponses?.map(
            (user: { memberId: string }, index: number) => {
              return index === saveListStatus?.memberResponses?.length - 1 ? (
                <SaveContent
                  key={user.memberId}
                  user={user}
                  ref={ScrollRowRef}
                  sendSaveValue={sendSaveValue}
                  sendBlockUser={sendBlockUser}
                  handleChildStateChange={handleChildStateChange}
                />
              ) : (
                <SaveContent
                  key={user.memberId}
                  sendSaveValue={sendSaveValue}
                  user={user}
                  sendBlockUser={sendBlockUser}
                  handleChildStateChange={handleChildStateChange}
                />
              );
            }
          )}
      </div>

      <Footer page="save" popup={childState} />
    </section>
  );
}

export default SaveScreen;
