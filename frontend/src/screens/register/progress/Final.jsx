import React from "react";
import { AfterRegisterButton } from "../../../components/Button";
import { styled } from "styled-components";

const Final = ({ currentStep, navigate }) => {
  return (
    <FinalRegisterWrap>
      <FinalRegisterSpan> 가입 완료!</FinalRegisterSpan>
      <img
        src="/가입완료.svg"
        alt="가입완료"
        style={{ width: "60%", height: "90%" }}
      />
      <AfterRegisterButton
        navigate={navigate}
        content={"DLink 이용하러 가기"}
        currentStep={currentStep}
      />
    </FinalRegisterWrap>
  );
};

const FinalRegisterWrap = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FinalRegisterSpan = styled.span`
  font-size: 2.3rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 6rem;
`;
export default Final;
