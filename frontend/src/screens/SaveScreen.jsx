import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveHeader } from "../components/Header";
import { getSaveListAction } from "../actions/saveAction";
import { styled } from "styled-components";
import UserCardColumn from "../components/UserCardColumn";
import { blockUserAction, saveUserAction } from "../actions/buttonAction";
import { SAVE_LIST_RESET } from "../constants/saveConstants";
import { BUTTON_SAVE_RESET } from "../constants/buttonConstants";

const SaveScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 유저의 save list 정보 */
  const saveListInfo = useSelector((state) => state.saveListInfo);
  const saveInfo = useSelector((state) => state.saveInfo);

  const { loading, error, saveListStatus } = saveListInfo;
  const ScrollRowRef = useRef(null);

  /** getSaveListAction parameter용 페이지 state */
  const [savePage, setSavePage] = useState(0);

  /** child component state값 저장 */
  const [childState, setChildState] = useState(null);
  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };
  /** 저장된 좋아요 한 유저 리스트 불러오고 다음 Page를 1추가 함 */
  const getSaveList = useCallback(
    async (savePage) => {
      await dispatch(getSaveListAction(savePage));
      setSavePage(savePage + 1);
    },
    [dispatch, saveListStatus?.endPageSignal]
  );

  /** 서버에 유저 좋아요 state 전송  */
  const sendSaveValue = useCallback(
    (memberId, saveBoolean) => {
      dispatch(saveUserAction(memberId, saveBoolean));
    },
    [dispatch]
  );

  /** 유저 차단 및 삭제  */
  const sendBlockUser = useCallback(
    (memberId, blockBoolean) =>
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
      <SaveHeader
        navigate={navigate}
        style={{ display: childState ? "none" : "flex" }}
      />
      <SaveRow
        style={{
          height: childState ? "100vh" : "82vh",
          marginTop: childState && "0",
          top: childState && "0",
          overflow: childState ? "hidden" : "scroll",
          padding: childState && "0",
        }}
      >
        {saveListStatus?.memberResponses &&
          saveListStatus?.memberResponses?.map((user, index) => {
            return index == saveListStatus?.memberResponses?.length - 1 ? (
              <UserCardColumn
                key={user.memberId}
                user={user}
                ref={ScrollRowRef}
                sendSaveValue={sendSaveValue}
                sendBlockUser={sendBlockUser}
                handleChildStateChange={handleChildStateChange}
              />
            ) : (
              <UserCardColumn
                key={user.memberId}
                sendSaveValue={sendSaveValue}
                user={user}
                sendBlockUser={sendBlockUser}
                handleChildStateChange={handleChildStateChange}
              />
            );
          })}
      </SaveRow>

      <Footer style={{ display: childState ? "none" : "flex" }} />
    </section>
  );
};
const SaveRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0 0.8rem;
  height: 82vh;
  position: absolute;
  align-items: start;
  overflow: scroll;
  justify-content: start;
  flex: 1;
  top: 9%;
  &::-webkit-scrollbar {
    display: none;
  }

  .example {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  // .save-column:nth-child(2n) {
  //   height: 40%;
  // }
  .save-column:nth-child(2) {
  }
  // .flex-item:nth-child(1) {
  //   order: 2; /* Change the order of the first flex item */
  // }

  // .flex-item:nth-child(2) {
  //   order: 3; /* Change the order of the second flex item */
  // }
`;
export default SaveScreen;
