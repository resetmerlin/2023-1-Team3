import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MobileMain from "../components/homeMain/MobileMain";
import DesktopMain from "../components/homeMain/DesktopMain";
i;
import DesktopNav from "../components/homeNav/DesktopNav";
const HomeScreen = () => {
  const isMobile = useMediaQuery({
    minWidth: 320,
    maxWidth: 599,
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1281px)" });

  return (
    <>
      <section className="home">
        <div className="home__top">
          <input
            type="checkbox"
            className="form__checkbox"
            id="profile-checkbox"
          />
          <label
            htmlFor="profile-checkbox"
            className="home__top__profile__wrap"
          >
            <box-icon type="solid" color="white" name="user"></box-icon>
          </label>
        </div>

        {/* Responsive Main */}
        {isMobile && <MobileMain />}
        {isDesktop && <DesktopMain />}
      </section>
      {/* Responsive Nav */}
      {isDesktop && <DesktopNav />}
    </>
  );
};

export default HomeScreen;
