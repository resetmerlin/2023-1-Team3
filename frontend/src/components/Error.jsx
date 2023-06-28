import React from "react";
import { styled } from "styled-components";

const Error = ({ error }) => {
  return (
    <ErrorPage>
      <ErrorPageWrap>
        <NumberError>404</NumberError>
        <ErrorPageContent>
          페이지를 <ErrorSpan>찾을 수 없습니다.</ErrorSpan>
        </ErrorPageContent>
        <ErrorPageSmall>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 입력하신 주소가
          정확한지 다시 확인해 주시기 바랍니다.
        </ErrorPageSmall>
      </ErrorPageWrap>

      <ErrorLogo src="/404.svg" alt="404-image" />
    </ErrorPage>
  );
};
export const ErrorSpan = styled.span`
  color: #8071fc;
  font-weight: 600;
`;

export const ErrorPage = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    color: black;
    margin-top: 2rem;
  }
`;
export const ErrorPageWrap = styled.div`
  position: absolute;
  top: 22%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    color: black;
    margin-top: 2rem;
  }
`;
export const ErrorPageSmall = styled.p`
  font-size: 0.9rem;
  margin: 1rem 0;
  width: 80%;
  color: #a2a2a3;
`;
export const ErrorPageContent = styled.div`
  font-size: 1.6rem;
  margin: 0.9rem 0.7rem;
`;

export const NumberError = styled.span`
  font-size: 5rem;
  font-weight: 600;
  color: #434a54;
`;

export const ErrorLogo = styled.img`
  position: absolute;
  bottom: 0;
`;
export default Error;
