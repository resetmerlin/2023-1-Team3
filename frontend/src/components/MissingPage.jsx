import React from "react";
import {
  ErrorPageWrap,
  NumberError,
  ErrorPageContent,
  ErrorSpan,
  ErrorPageSmall,
  ErrorPage,
  ErrorLogo,
} from "./Error";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const MissingPage = () => {
  return (
    <ErrorPage>
      <ErrorPageWrap>
        <div>
          <Link to="/">
            <ErrorLink>
              <box-icon
                type="solid"
                name="home"
                color="#8071fc"
                size="3.3rem"
              ></box-icon>
            </ErrorLink>
          </Link>
          <NumberError>404</NumberError>
        </div>

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

export default MissingPage;

export const ErrorLink = styled.span`
  color: #8071fc;
  font-weight: 600;
  font-size: 2rem;
`;
