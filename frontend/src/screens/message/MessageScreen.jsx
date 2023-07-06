import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import { MessageHeader } from "../../components/Header";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import {
  getMessagesAction,
  messageInitiateAction,
} from "../../actions/messageAction";
import UserMessage from "../../components/UserMessage/UserMessage";
import { giveCurrentTime } from "../../func/UserImage";
const MessageScreen = () => {
  const navigate = useNavigate(0);
  const dispatch = useDispatch();

  // 내 정보 가져오기
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: myAccountInfo } = personalInfo;

  /**유저 정보 가져오기*/
  const messageInfo = useSelector((state) => state.messageInfo);
  const { messageUserStatus, loading } = messageInfo;

  const { id } = useParams();

  const client = useRef();

  /** 내가 보낸 혹은 받은 메세지를 state로 저장 */
  const getMessageFromServer = useCallback((response) => {
    dispatch(getMessagesAction(response));
  });

  /** 메세지를 주고 받았던 사람들을 불러옴  */
  function getPersonMessageRelation() {
    client.current.send(
      "/app/log",
      {},
      JSON.stringify({
        memberId: myAccountInfo?.memberId,
        timeStamp: giveCurrentTime(),
      })
    );
  }

  /** CONNECT: 웹 소켓 열어서 서버와 통신 시작 */
  function connectionInitiate() {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);
    client.current = Stomp.over(socket);
    client.current.connect({}, () => {
      getDirectionOfMessages();
    });
  }

  /** SUBSCRIBE: 내 메세지 direction 접속 */

  function getDirectionOfMessages() {
    const memberId = myAccountInfo?.memberId;
    const headers = { memberId: memberId };

    client.current.subscribe(
      `/topic/${memberId}`,
      function (response) {
        // 메세지 기록 redux에 저장하기 위해 dispatch
        getMessageFromServer(response);
      },
      headers
    );

    getPersonMessageRelation();
  }

  useEffect(() => {
    if (!myAccountInfo) {
      dispatch(getPersonalInfoAction());
    } else {
      connectionInitiate();
    }
  }, [myAccountInfo]);

  const startMessage = async (user) => {
    await dispatch(messageInitiateAction(user));

    navigate(`/message/id?user=${user?.memberId}`);
  };
  return (
    <>
      <section className="message">
        <MessageHeader navigate={navigate}></MessageHeader>

        <Row>
          <NewMessagesCount>
            {messageUserStatus?.length}개의 새로운 메세지
          </NewMessagesCount>

          {messageUserStatus &&
            messageUserStatus.map((user) => {
              return <UserMessage user={user} startMessage={startMessage} />;
            })}
        </Row>
        <Footer />
      </section>
    </>
  );
};

const NewMessagesCount = styled.span`
  display: inline;
  padding: 3px;
  width: fit-content;
  color: black;
  background-color: #efeefd;
  color: #8071fc;
  font-weight: 600;
  margin-bottom: 1.4rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  height: 76vh;
  width: 100%;

  padding: 2rem 1.3rem 0 1.3rem;
`;

export default MessageScreen;
