import { styled } from "styled-components";
export const HorizontalLine = () => {
  return <HorizontalSeparator>or</HorizontalSeparator>;
};

const HorizontalSeparator = styled.span`
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
  color: #9a9a9a;

  &:before,
  &:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid #9a9a9a;
    margin: auto;
  }
  &:before {
    margin-right: 10px;
  }
  &:after {
    margin-left: 10px;
  }
`;
