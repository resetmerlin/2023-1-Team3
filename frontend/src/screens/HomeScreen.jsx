import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MobileMain from "../components/homeMain/MobileMain";
import DesktopMain from "../components/homeMain/DesktopMain";
import MobileBottom from "../components/homeBottom/MobileBottom";
import DesktopBottom from "../components/homeBottom/DesktopBottom";
import DesktopNav from "../components/homeNav/DesktopNav";
import { BoxIconElement } from "boxicons";

const HomeScreen = () => {
  const isMobile = useMediaQuery({
    minWidth: 320,
    maxWidth: 599,
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1281px)" });

  return (
    <>
      <section className="home">
        {/* <div className="home__top">
          <input
            type="checkbox"
            className="form__checkbox"
            id="profile-checkbox"
          />
          <label
            htmlFor="profile-checkbox"
            className="home__top__profile__wrap"
          >
            <box-icon
              type="solid"
              size="1.5rem"
              color="white"
              name="user"
            ></box-icon>
          </label>
        </div> */}

        <box-icon
          name="chevron-right"
          id="home__img__slide"
          color="#ffffffa1"
          size="2.5rem"
        ></box-icon>
        {/* Responsive Main */}
        {isMobile && <MobileMain />}
        {isDesktop && <DesktopMain />}

        {/* Responsive Bottom */}
        {isMobile && <MobileBottom />}
        {isDesktop && <DesktopBottom />}
      </section>
      {/* Responsive Nav */}
      {isDesktop && <DesktopNav />}
    </>
  );
};

export default HomeScreen;
