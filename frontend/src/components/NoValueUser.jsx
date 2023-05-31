import React, { memo } from "react";
import { styled } from "styled-components";
import { HomeWrap } from "../screens/home/HomeContent";
import { RecapUserListsButton } from "./Button";
const NoValueUser = memo(function NoValueUser({ getPeopleList }) {
  return (
    <HomeWrap>
      <NoValueWrap>
        <NoValueImageWrap>
          <NoValueImage src="/no-value.png" alt="no-value-image" />
        </NoValueImageWrap>

        <NoValueTextWrap>
          <NoValueTextBig>더 볼 유저가 없습니다.. </NoValueTextBig>
          <NoValueTextSmall>처음부터 유저를 다시 볼까요?</NoValueTextSmall>
        </NoValueTextWrap>
        <NoValueTextWrap style={{ height: "27%" }}>
          <RecapUserListsButton getPeopleList={getPeopleList} />

          {/* <NoValueTextSmall
            style={{
              fontSize: "0.8rem",
              color: "rgb(128, 113, 252)",
              marginTop: "1rem",
            }}
          >
            다시보기가 되지 않으면 저장화면에 가보세요!
          </NoValueTextSmall> */}
        </NoValueTextWrap>
      </NoValueWrap>
    </HomeWrap>
  );
});

const NoValueTextBig = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  padding: 0.7rem 0;
`;

const NoValueTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 23%;
`;
const NoValueTextSmall = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const NoValueImage = styled.img`
  width: 11rem;
  height: 14rem;
`;
const NoValueImageWrap = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.4rem 0;
`;

const NoValueWrap = styled.div`
  height: 99%;
  width: 85%;
  border-radius: 12px;

  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 0.7rem 0;
  align-items: center;
  // box-shadow: 0px 0px 17px 6px rgb(236, 234, 247, 1);
  // -webkit-box-shadow: 0px 0px 17px 6px rgb(236, 234, 247, 1);
  // -moz-box-shadow: 0px 0px 17px 6px rgb(236, 234, 247, 1);
`;
export default NoValueUser;
