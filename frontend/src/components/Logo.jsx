import React from "react";
import styled from "styled-components";

export const LogoImageMedium = () => {
  return <LogoImageM src="/logo.svg" alt="logo-white-1" />;
};

export const LogoImageLarge = () => {
  return <LogoImageL src="/logo.svg" alt="logo-white-1" />;
};
export const LogoSizeL = () => {
  return (
    <LogoWrap>
      <LogoImageLarge />
    </LogoWrap>
  );
};

export const LogoSizeM = () => {
  return (
    <LogoWrap>
      <LogoImageMedium />
    </LogoWrap>
  );
};

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  overflow: hidden;
`;

const LogoImageL = styled.img`
  width: 13rem;
  height: 13rem;
`;

const LogoImageM = styled.img`
  width: 7rem;
  height: 7rem;
`;
