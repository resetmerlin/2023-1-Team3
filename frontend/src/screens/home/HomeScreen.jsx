import React, { useEffect, useRef, Suspense } from "react";
import Footer from "../../components/Footer";
import HomeContent from "./HomeContent";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import { peopleListAction } from "../../actions/peopleAction";
import AlertCover from "../../components/AlertCover";
import Loading from "../../components/Loading";
import { saveUserAction } from "../../actions/buttonAction";
import { HomeHeader } from "../../components/Header";
import { BackButton } from "../../components/Button";
const HomeScreen = () => {
  const dispatch = useDispatch();

  /** Redux에서 가져온 유저 리스트 */
  const peopleListInfo = useSelector((state) => state.peopleListInfo);

  const {
    peopleListStatus,
    error: peopleListError,
    loading: peopleListLoading,
  } = peopleListInfo;
  /** 좋아요 ref */

  useEffect(() => {
    if (
      /** if no lists of people, Dispatch Action to get data from server
       * 사람들 리스트가 없으면 dispatch Action으로 서버에 데이터를 가져온다.) */
      !peopleListStatus &&
      !peopleListStatus?.memberResponses
    ) {
      dispatch(peopleListAction());
    }
  }, [dispatch, peopleListStatus]);

  const options = {
    rewind: false,
    type: "slide",
    perPage: 1,
    perMove: 1,
    pagination: false,
  };

  const splideRef = useRef(null);

  /** 전 슬라이드 페이지 값 */
  const previousPage = useRef(-1);

  const getMoreUserHandler = (e) => {
    if (e !== previousPage.current) {
      previousPage.current = e;
    } else if (previousPage.current == peopleListStatus?.count - 1) {
      getUserFromServer();
    }
  };

  const getUserFromServer = () => {
    dispatch(peopleListAction());
    previousPage.current = -1;

    splideRef.current.splide.Components.Controller.go(0);
  };

  const getPreviousUserHandler = () => {
    const getNextPage =
      splideRef?.current.splide.Components.Controller.getNext();

    if (previousPage?.current == peopleListStatus?.count - 1) {
      getUserFromServer();
    } else {
      splideRef.current.splide.Components.Controller.go(getNextPage);
    }
  };

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
          onMoved={(e) =>
            getMoreUserHandler(e.Components.Controller.getIndex())
          }
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
                        saveUserAction={saveUserAction}
                        getPreviousUserHandler={getPreviousUserHandler}
                      />
                    </SplideSlide>
                  </Suspense>
                );
              })}
          </SplideTrack>
        </Splide>
        {peopleListStatus?.endPageSignal && (
          <AlertCover endPageSignal={peopleListStatus?.endPageSignal} />
        )}

        <Footer />
      </section>
    </>
  );
};

export default HomeScreen;
