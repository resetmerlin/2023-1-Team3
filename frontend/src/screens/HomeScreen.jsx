import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import { peopleListAction } from "../actions/peopleAction";
import { Link, useNavigate } from "react-router-dom";
import AlertCover from "../components/AlertCover";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 로그인 정보 */
  const loginInfo = useSelector((state) => state.loginInfo);

  /** loginInfo에서의 token값  */
  const { sessfbs_ffa0934 } = loginInfo;

  /** Redux에서 가져온 유저 리스트 */
  const peopleList = useSelector((state) => state.peopleListInfo);

  const {
    peopleListStatus,
    error: peopleListError,
    loading: peopleListLoading,
  } = peopleList;

  useEffect(() => {
    /** If there is no accessToken, go to Login page
     * (AccessToken이 없으면 로그인 페이지로 간다.) */
    if (!sessfbs_ffa0934) {
      navigate("/login");
    } else if (
      /** If there is accessToken, but no lists of people, Dispatch Action to get data from server
       * (Accesstoken이 있으나 사람들 리스트가 없으면 dispatch Action으로 서버에 데이터를 가져온다.) */
      !peopleListStatus &&
      !peopleListStatus?.memberResponses &&
      sessfbs_ffa0934
    ) {
      dispatch(peopleListAction());
    }
  }, [sessfbs_ffa0934, dispatch, peopleListStatus]);

  const options = {
    rewind: false,
    type: "slide",
    perPage: 1,
    perMove: 1,
    pagination: false,
  };

  /** Last index of people lists array
   * (사람들 리스트 중 마지막 인덱스 값)
   */
  const lastValueIndex = peopleListStatus?.memberResponses.length - 1;

  /** memberId of the Last value about people lists
   * (Array안 사람 리스트 중 마지막 사람의 memberId 값)
   */
  const lasValueUser =
    peopleListStatus?.memberResponses[lastValueIndex]?.memberId;

  const [checkSlide, setCheckSlide] = useState(-1);

  const test = useRef(-1);
  const getMoreUserHandler = (e) => {
    if (e !== test.current) {
      test.current = e;
    } else if (test.current == 4) {
      dispatch(peopleListAction());
      test.current = -1;

      console.log(test.current);
    }
  };
  const inputRef = useRef(null);

  return (
    <>
      <section className="home">
        <Splide
          ref={inputRef}
          hasTrack={false}
          options={options}
          id="Splide"
          onMoved={(e) =>
            getMoreUserHandler(e.Components.Controller.getIndex())
          }
          onMove={(e) => {
            if (test.current == -1 && e == 4) {
              e.Components.Move.toIndex(0);
            }
          }}
        >
          <SplideTrack>
            {peopleListStatus &&
              peopleListStatus?.memberResponses.map((user) => {
                return (
                  <SplideSlide key={user.memberId} id="SplideSlide">
                    <HomeContent user={user} lastValue={lasValueUser} />
                  </SplideSlide>
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
