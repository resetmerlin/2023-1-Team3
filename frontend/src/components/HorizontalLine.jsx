import { styled } from "styled-components";
export const HorizontalLine = () => {
  return <HorizontalSeparator>or</HorizontalSeparator>;
};

export const MessageHorizontalLine = ({ date, time }) => {
  const props = {
    messageTime: date + " " + time,
  };

  return <MessageHorizontalLineView {...props} />;
};
const MessageHorizontalLineView = ({ messageTime }) => {
  return <MessageHorizontalSeparator>{messageTime}</MessageHorizontalSeparator>;
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

const MessageHorizontalSeparator = styled.span`
  display: flex;
  flex-direction: row;
  color: rgb(128, 113, 252);
  font-size: 0.8rem;
  margin: 0.5rem 0;

  &:before,
  &:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid rgb(128, 113, 252);
    margin: auto;
  }
  &:before {
    margin-right: 10px;
  }
  &:after {
    margin-left: 10px;
  }
`;
