import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Messages = ({ user }) => {
  return (
    <Column>
      {!user?.image ? (
        <MessageProfile
          style={{
            backgroundImage: `
    url('../public/SDS대지 12 사본@3x.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          alt="message-profile"
        ></MessageProfile>
      ) : (
        <MessageProfile
          style={{
            backgroundImage: `
  url(${user?.image}`,
          }}
          alt="message-profile"
        ></MessageProfile>
      )}
      <MessageWrap>
        <MessageDescWrap>
          <Link to="/conversation">
            <span>Jordyn Dokidos</span>
            <MessageConversation>Hi!</MessageConversation>
          </Link>
        </MessageDescWrap>

        <MessageNotifyWrap>
          <MessageNotifyTime>8:12pm</MessageNotifyTime>
          <MessageNotification>1</MessageNotification>
        </MessageNotifyWrap>
      </MessageWrap>
    </Column>
  );
};
const MessageProfile = styled.div`
  padding: 0;
  margin: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  margin-right: 1.5rem;
`;

const MessageWrap = styled.div`
  min-width: 70%;
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(196, 196, 196);
`;

const MessageDescWrap = styled.div`
  height: 100%;
  font-weight: 600;
  display: flex;
  a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-decoration: none;
    color: black;
  }
`;

const MessageConversation = styled.div`
  margin-top: 6px;
  width: 100%;
  font-size: 0.8rem;
  white-space: normal;
  overflow: hidden;
  color: rgb(167 165 165);
`;

const MessageNotifyWrap = styled.div`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0.5rem 0;
`;

const MessageNotifyTime = styled.span`
  width: 100%;
  font-size: 0.7rem;
  color: rgb(167 165 165);
  margin-bottom: 0.5rem;
`;

const MessageNotification = styled.div`
  width: 1.7rem;
  height: 1.3rem;
  line-height: 1.3rem;
  background-color: rgb(116, 78, 219);
  color: white;
  justify-content: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  margin: 0.7rem 0;
  align-items: center;
`;

export default Messages;
