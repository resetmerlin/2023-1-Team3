import React, {
  useEffect,
  useRef,
  Suspense,
  useCallback,
  useState,
} from "react";
import Footer from "../../components/Footer";
import HomeContent from "./HomeContent";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import { peopleListAction } from "../../actions/peopleAction";
import Loading from "../../components/Loading";
import { saveUserAction } from "../../actions/buttonAction";
import { HomeHeader } from "../../components/Header";
import NoValueUser from "../../components/NoValueUser";
import { useNavigate } from "react-router-dom";
import { blockUserAction } from "../../actions/buttonAction";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 유저 리스트 */
  const peopleListInfo = useSelector((state) => state.peopleListInfo);

  const {
    peopleListStatus,
    error: peopleListError,
    loading: peopleListLoading,
  } = peopleListInfo;

  /** user Lists 불러오는 함수*/
  const getPeopleList = useCallback(
    () => dispatch(peopleListAction()),
    [dispatch]
  );

  /** 유저 차단 및 삭제  */
  const sendBlockUser = useCallback(
    (memberId, blockBoolean) =>
      dispatch(blockUserAction(memberId, blockBoolean)),
    [dispatch]
  );

  /** 유저 좋아요 및 저장  */
  const sendLikeUser = useCallback(
    (memberId, saveBoolean) => dispatch(saveUserAction(memberId, saveBoolean)),
    [dispatch]
  );

  /** 해당 페이지에 이동할때마다 서버로부터 사람 리스트 불러옴*/
  useEffect(() => {
    getPeopleList();
  }, [getPeopleList]);

  const options = {
    rewind: false,
    type: "slide",
    perPage: 1,
    perMove: 1,
    pagination: false,
  };

  /** 자식 Popup boolean을 체크 후 style를 props로 주기위한 state */
  const [userCardPopup, setUserCardPopup] = useState(null);

  /** checked state(true or false)를 parameter로 받아 state로 저장 */
  const getUserFromChild = useCallback(
    (e) => {
      setUserCardPopup(e);
    },
    [setUserCardPopup]
  );

  /** 슬라이드 Reference */
  const splideRef = useRef(null);

  /** 전 슬라이드 페이지 값 */
  const previousPage = useRef(-1);

  /** 슬라이드 페이지 값 변경 및 값에 따라 callback함수 trigger */
  const slidePageHandler = useCallback(
    (e) => {
      /** 이전 페이지와 현재 페이지 값이 다를 경우 */
      if (e !== previousPage?.current) {
        previousPage.current = e;
      } else if (
        /** 마지막 페이지에 있는데 슬라이드를 할 경우*/

        previousPage?.current ==
        peopleListStatus?.count - 1
      ) {
        nextPeopleListsHandler();
      }
    },
    [previousPage?.current, peopleListStatus?.count]
  );

  /** 새로운 유저 리스트 가져오는 프로세스 핸들 */
  const nextPeopleListsHandler = useCallback(() => {
    getPeopleList();
    previousPage.current = -1;

    splideRef.current.splide.Components.Controller.go(0);
  }, [splideRef]);

  /** 다음 슬라이드로 이동 */
  const goNextSlideHandler = useCallback(() => {
    const getNextPage =
      splideRef?.current.splide.Components.Controller.getNext();

    if (previousPage?.current == peopleListStatus?.count - 1) {
      nextPeopleListsHandler();
    } else {
      splideRef.current.splide.Components.Controller.go(getNextPage);
    }
  }, [
    splideRef?.current?.splide?.Components?.Controller,
    previousPage?.current,
    peopleListStatus?.count,
  ]);

  return (
    <>
      <section className="home">
        <HomeHeader
          navigate={navigate}
          style={{ display: userCardPopup ? "none" : "flex" }}
        />

        <Splide
          ref={splideRef}
          hasTrack={false}
          options={{ ...options, drag: userCardPopup ? false : true }}
          id="Splide"
          onMoved={(e) => slidePageHandler(e.Components.Controller.getIndex())}
          style={{ height: userCardPopup ? "100vh" : "80vh" }}
        >
          <SplideTrack>
            {peopleListStatus &&
              peopleListStatus?.memberResponses.map((user) => {
                return (
                  <Suspense fallback={<Loading />} key={user.memberId}>
                    <SplideSlide key={user.memberId} id="SplideSlide">
                      <HomeContent
                        user={user}
                        key={user.memberId}
                        peopleListLoading={peopleListLoading}
                        sendLikeUser={sendLikeUser}
                        goNextSlideHandler={goNextSlideHandler}
                        userCardPopup={userCardPopup}
                        sendBlockUser={sendBlockUser}
                        getUserFromChild={getUserFromChild}
                      />
                    </SplideSlide>
                  </Suspense>
                );
              })}

            {peopleListStatus?.endPageSignal && (
              <SplideSlide>
                <NoValueUser getPeopleList={getPeopleList} />{" "}
              </SplideSlide>
            )}
          </SplideTrack>
        </Splide>

        <Footer style={{ display: userCardPopup ? "none" : "flex" }} />
      </section>
    </>
  );
};

export default HomeScreen;
