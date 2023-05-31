import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveHeader } from "../components/Header";
import { BackButton } from "../components/Button";
import { getSaveListAction } from "../actions/saveAction";
import { styled } from "styled-components";
import UserCardColumn from "../components/UserCardColumn";

const SaveScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 유저의 save list 정보 */
  const saveListInfo = useSelector((state) => state.saveListInfo);
  const { loading, error, saveListStatus } = saveListInfo;
  const ScrollRowRef = useRef(null);
  const [savePage, setSavePage] = useState(0);

  /** 저장된 좋아요 한 유저 리스트 불러오고 다음 Page를 1추가 함 */
  const getSaveList = useCallback(
    async (savePage) => {
      await dispatch(getSaveListAction(savePage));
      setSavePage(savePage + 1);
    },
    [dispatch, saveListStatus?.endPageSignal]
  );

  /** 좋아요 한 리스트 값이 없을 경우 API call함 */
  useEffect(() => {
    /** 처음 Data fetch 시작 */
    if (saveListStatus?.memberResponses.length === 0) {
      getSaveList(0);
    }
  }, [dispatch]);

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
      <SaveHeader navigate={navigate} />
      <SaveRow>
        {saveListStatus?.memberResponses &&
          saveListStatus?.memberResponses?.map((user, index) => {
            return index == saveListStatus?.memberResponses?.length - 1 ? (
              <UserCardColumn
                key={user.memberId}
                user={user}
                ref={ScrollRowRef}
              />
            ) : (
              <UserCardColumn key={user.memberId} user={user} />
            );
          })}
      </SaveRow>
      <Footer />
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
