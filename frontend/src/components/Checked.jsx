import React, { memo } from "react";
import { BoxIconElement } from "boxicons";
import { styled, keyframes, Attrs } from "styled-components";

export const ButtonChecked = () => {
  return <StyledChecked></StyledChecked>;
};

const CheckedAnimation = keyframes`

to {
    stroke-dashoffset: 0
}
`;

const StyledChecked = styled.i.attrs({
  className: "bx bxs-check",
})`
  font-size: 2rem;
  color: white;
  stroke-width: 4;
  stroke-dasharray: 23;
  stroke-dashoffset: 23;
  stroke-linecap: round;
  stroke-linejoin: round
  animation: ${CheckedAnimation} 1s linear forwards;
`;
