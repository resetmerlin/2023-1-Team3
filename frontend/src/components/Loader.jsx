import { styled, keyframes } from "styled-components";
import React, { memo } from "react";

export const ButtonLoading = () => {
  return <Loader />;
};

const Rotation = keyframes`

0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Loader = styled.span`
  width: 2rem;
  height: 2rem;
  border: 4px solid;
  border-color: white transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;

  animation: ${Rotation} 2s linear infinite;
`;
