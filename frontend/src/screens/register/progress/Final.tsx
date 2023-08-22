import React from 'react';
import { styled } from 'styled-components';
import Button from '../../../components/atoms/button/InstanceMaker';

const Final = ({ navigate }) => {
  const buttonHandler = () => navigate(`/login`);
  return (
    <FinalRegisterWrap>
      <FinalRegisterSpan> 가입 완료!</FinalRegisterSpan>
      <img
        src="/가입완료.svg"
        alt="가입완료"
        style={{ width: '60%', height: '90%' }}
      />

      <Button onClick={buttonHandler} className="marginTop-m" size="xl">
        DLink 이용하러 가기
      </Button>
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
