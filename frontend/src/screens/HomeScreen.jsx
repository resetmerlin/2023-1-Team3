import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import { demoUser } from "../Index";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import { peopleListAction } from "../actions/peopleAction";
import { Link, useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const peopleList = useSelector((state) => state.peopleListInfo);
  const loginStatus = useSelector((state) => state.loginInfo);

  const { sessfbs_ffa0934 } = loginStatus;

  const {
    peopleListStatus,
    error: peopleListError,
    loading: peopleListLoading,
  } = peopleList;

  useEffect(() => {
    if (!peopleListStatus?.memberResponses) {
      dispatch(peopleListAction());
    } else if (!peopleListStatus?.memberResponses && !sessfbs_ffa0934) {
      navigate("/login");
    }
  }, [dispatch, sessfbs_ffa0934, peopleListStatus?.memberResponses]);

  const options = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    pagination: false,
  };

  console.log(peopleListStatus?.memberResponses);
  return (
    <>
      <section className="home">
        <Splide options={options} id="Splide">
          {demoUser.map((user) => {
            return (
              <SplideSlide key={user.id} id="SplideSlide">
                <HomeContent user={user} />;
              </SplideSlide>
            );
          })}
        </Splide>

        <Footer />
      </section>
    </>
  );
};

export default HomeScreen;
