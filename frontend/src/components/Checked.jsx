import React, { memo } from "react";
import { BoxIconElement } from "boxicons";
import { styled, keyframes } from "styled-components";

export const ButtonChecked = () => {
  return (
    <Checked
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="transparent"
      viewBox="0 0 24 24"
    >
      <Path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></Path>
    </Checked>
  );
};

const CheckedAnimation = keyframes`

to {
  stroke-dashoffset: 0
}
`;

const Checked = styled.svg`
  stroke-width: 2;
  stroke: white;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
const Path = styled.path`
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: ${CheckedAnimation} 1s linear forwards;
`;
