import React, { useEffect, useRef, Suspense, useCallback } from "react";
import Footer from "../../components/Footer";
import HomeContent from "./HomeContent";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import { peopleListAction } from "../../actions/peopleAction";
import Loading from "../../components/Loading";
import { saveUserAction } from "../../actions/buttonAction";
import { HomeHeader } from "../../components/Header";
import { BackButton } from "../../components/Button";
import NoValueUser from "../../components/NoValueUser";
const HomeScreen = () => {
  const dispatch = useDispatch();

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

  /** 유저 좋아요 및 저장  */
  const sendLikeUser = useCallback(
    (memberId, saveBoolean) => dispatch(saveUserAction(memberId, saveBoolean)),
    [dispatch]
  );

  useEffect(() => {
    if (
      /** if no lists of people, call function to get data from server
       * 사람들 리스트가 없으면 콜백함수로 데이터를 가져온다.) */
      !peopleListStatus &&
      !peopleListStatus?.memberResponses
    ) {
      getPeopleList();
    }
  }, [getPeopleList, peopleListStatus]);

  const options = {
    rewind: false,
    type: "slide",
    perPage: 1,
    perMove: 1,
    pagination: false,
  };

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

  const nextPeopleListsHandler = () => {
    getPeopleList();
    previousPage.current = -1;

    splideRef.current.splide.Components.Controller.go(0);
  };

  const getPreviousUserHandler = useCallback(() => {
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
        <HomeHeader />
        <BackButton />
        <Splide
          ref={splideRef}
          hasTrack={false}
          options={options}
          id="Splide"
          onMoved={(e) => slidePageHandler(e.Components.Controller.getIndex())}
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
                        dispatch={dispatch}
                        sendLikeUser={sendLikeUser}
                        getPreviousUserHandler={getPreviousUserHandler}
                      />
                    </SplideSlide>
                  </Suspense>
                );
              })}

            {peopleListStatus?.endPageSignal && (
              <SplideSlide>
                <NoValueUser />{" "}
              </SplideSlide>
            )}
          </SplideTrack>
        </Splide>

        <Footer />
      </section>
    </>
  );
};

export default HomeScreen;
