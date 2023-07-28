import React from "react";
import { useMediaQuery } from "react-responsive";
import { styled } from "styled-components";

const DesktopBlock = () => {
  const isDesktopMinimum = useMediaQuery({
    query: "(min-width: 599px)",
  });
  return (
    <>
      {isDesktopMinimum && (
        <DesktopContainer>
          <ErrorPage>
            <ErrorPageWrap>
              <NumberError>404</NumberError>
              <ErrorPageContent>
                페이지를 <ErrorSpan>찾을 수 없습니다.</ErrorSpan>
              </ErrorPageContent>
              <ErrorPageSmall>
                Destop 뷰는 현재 지원되지 않습니다. 모바일 기기를 사용해 주세요.
              </ErrorPageSmall>
            </ErrorPageWrap>

            <ErrorLogo src="/404.svg" alt="404-image" />
          </ErrorPage>
        </DesktopContainer>
      )}
    </>
  );
};

const ErrorSpan = styled.span`
  color: #8071fc;
  font-weight: 600;
`;

const ErrorPage = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  a {
    color: black;
    margin-top: 2rem;
  }
`;
const ErrorPageWrap = styled.div`
  height: 60%;
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
const ErrorPageSmall = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
  color: #a2a2a3;
`;
const ErrorPageContent = styled.div`
  font-size: 2rem;
  margin: 0.9rem 0.7rem;
`;

const NumberError = styled.span`
  font-size: 5rem;
  font-weight: 600;
  color: #434a54;
`;

const ErrorLogo = styled.img`
  height: 26rem;
  width: 26rem;
  bottom: 0;
`;
const DesktopContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000;
`;

export default DesktopBlock;
