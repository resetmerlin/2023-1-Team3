import { styled, keyframes } from 'styled-components';

export function ButtonLoading() {
  return <Loader />;
}

export function MessageLoader() {
  return (
    <box-icon
      name="send"
      rotate="180"
      size=".9rem"
      type="solid"
      style={{ position: 'absolute', left: '-1.3rem', top: '1.7rem' }}
      color="rgb(196, 196, 196)"
    />
  );
}

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
