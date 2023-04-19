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

  const saveInfo = useSelector((state) => state.saveInfo);

  const { loading, error, saveStatus } = saveInfo;
  console.log(loading);
  console.log(error);
  console.log(saveStatus);

  const {
    peopleListStatus,
    error: peopleListError,
    loading: peopleListLoading,
  } = peopleList;

  useEffect(() => {
    if (!sessfbs_ffa0934) {
      navigate("/login");
    } else if (!peopleListStatus && !peopleListStatus?.memberResponses) {
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

  const lastValueIndex = peopleListStatus?.memberResponses.length - 1;
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
