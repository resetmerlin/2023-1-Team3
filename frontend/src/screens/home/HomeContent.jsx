import React from "react";
import "@splidejs/react-splide/css";
import HomeMain from "./HomeMain";
import { styled } from "styled-components";
import Loading from "../../components/Loading";
const HomeContent = ({
  user,
  dispatch,
  saveUserAction,
  peopleListLoading,
  getPreviousUserHandler,
}) => {
  return (
    <HomeWrap>
      <HomeContentWrap>
        {user?.image == "DEFAULT" && user?.gender == "MALE" ? (
          <HomeCard
            className="home__content"
            style={{
              backgroundImage: `
    url('../public/default/default-men.png')`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></HomeCard>
        ) : user?.image == "DEFAULT" && user?.gender == "FEMALE" ? (
          <HomeCard
            className="home__content"
            style={{
              backgroundImage: `
  url('../public/default/default-women.png')`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></HomeCard>
        ) : (
          <HomeCard
            className="home__content"
            style={{
              backgroundImage: `linear-gradient(
  359deg,
  rgba(0, 0, 0, 0.829) 20%,

  rgba(0, 0, 0, 0.629) 30%,

  rgba(0, 0, 0, 0.144) 100%
),
url(${user?.image}`,
            }}
          ></HomeCard>
        )}

        {peopleListLoading ? (
          <Loading />
        ) : (
          <>
            <HomeInfo>
              <HomeMain
                getPreviousUserHandler={getPreviousUserHandler}
                userDetail={user}
                dispatch={dispatch}
                saveUserAction={saveUserAction}
              />
            </HomeInfo>
          </>
        )}
      </HomeContentWrap>
    </HomeWrap>
  );
};

const HomeCard = styled.div`
  height: 77%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.5rem;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: all 0.2s ease;
  border-radius: 12px;
`;

const HomeWrap = styled.div`
  position: absolute;
  height: 96%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HomeContentWrap = styled.div`
  height: 100%;
  flex-direction: column;
  width: 85%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const HomeInfo = styled.div`
  height: 23%;
  width: 100%;

  display: flex;
  justify-content: center;
  background-color: white;
  transition: all 0.2s ease;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  align-items: center;
  box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
`;

export default HomeContent;
