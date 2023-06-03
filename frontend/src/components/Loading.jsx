import React from "react";
import { styled, keyframes } from "styled-components";
const Loading = () => {
  return (
    <LoaderWrap>
      <Loader />
    </LoaderWrap>
  );
};

export default Loading;
const Rotation = keyframes`

0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Loader = styled.span`
  width: 5rem;
  height: 5rem;
  border: 6px solid;
  border-color: black transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;

  animation: ${Rotation} 2s linear infinite;
`;
const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
