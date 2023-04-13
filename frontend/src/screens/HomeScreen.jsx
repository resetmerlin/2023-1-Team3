import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import { demoUser } from "../Index";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import { peopleListAction } from "../actions/peopleAction";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const peopleList = useSelector((state) => state.peopleListInfo);

  const {
    peopleListStatus,
    error: peopleListError,
    loading: peopleListLoading,
  } = peopleList;

  useEffect(() => {
    if (!peopleListStatus) {
      dispatch(peopleListAction());
    }
  }, [dispatch]);

  console.log(peopleListStatus);
  const options = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    pagination: false,
  };
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
