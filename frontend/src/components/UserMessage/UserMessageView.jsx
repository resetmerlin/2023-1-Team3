import React, { memo } from 'react';
import { styled } from 'styled-components';

const UserMessageView = memo(function UserMessageView({
  message,
  image,
  name,
  goToChatScreen,
}) {
  return (
    <Column onClick={goToChatScreen}>
      <MessageProfile src={image} alt='message-profile'></MessageProfile>
      <MessageWrap>
        <MessageDescWrap>
          <div>
            <span>{name}</span>
            <MessageConversation>{message}</MessageConversation>
          </div>
        </MessageDescWrap>

        <MessageNotifyWrap>
          <box-icon
            style={{
              position: 'relative',
            }}
            type='solid'
            name='message-rounded'
            color='rgb(128, 113, 252)'
            size='2rem'
          ></box-icon>
          <MessageNotification>1</MessageNotification>
        </MessageNotifyWrap>
      </MessageWrap>
    </Column>
  );
});

const MessageProfile = styled.img`
  padding: 0;
  margin: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1.5rem;
  object-fit: cover;
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
  display: flex;
  overflow: hidden;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-decoration: none;
    span {
      font-size: 1.3rem;

      font-weight: 500;
    }
  }
`;

const MessageConversation = styled.div`
  width: 100%;
  font-size: 0.9rem;
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
  position: relative;
`;

const Column = styled.button`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  margin: 0.5rem 0;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const MessageNotification = styled.span`
  color: white;
  font-weight: 600;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;
export default UserMessageView;
