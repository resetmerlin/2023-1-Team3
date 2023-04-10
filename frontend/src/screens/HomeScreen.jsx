import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import { demoUser } from "../Index";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HomeScreen = () => {
  // const isMobile = useMediaQuery({
  //   minWidth: 320,
  //   maxWidth: 599,
  // });
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
