import React from "react";
import styled from "styled-components";

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
`;

const LogoImage = styled.img`
  width: 11rem;
  height: 11rem;
`;
const Logo = () => {
  return (
    <LogoWrap>
      <LogoImage
        src=" ../public/2023_VISTA/logo-white-1.png"
        alt="logo-white-1"
      />
    </LogoWrap>
  );
};

export default Logo;
