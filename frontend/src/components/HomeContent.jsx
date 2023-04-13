import React from "react";
import { BoxIconElement } from "boxicons";
import HomeMain from "./HomeMain";

const HomeContent = ({ user }) => {
  return (
    <div
      className="home__content"
      style={{
        backgroundImage: `linear-gradient(
        359deg,
        rgba(0, 0, 0, 0.829) 20%,

        rgba(0, 0, 0, 0.629) 30%,

        rgba(0, 0, 0, 0.144) 100%
      ),
      url(${user.img})`,
      }}
    >
      <HomeMain userDetail={user} />
    </div>
  );
};

export default HomeContent;
