import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import { getMessagesAction } from "../../actions/messageAction";
import { styled } from "styled-components";
import ConversationContent from "./content/ConversationContent";
import ConversationBottom from "./bottom/ConversationBottom";
import ConversationHeader from "./header/ConversationHeader";
import { giveCurrentTime } from "../../func/commonLogicHelper";

const ConversationScreen = () => {
  const dispatch = useDispatch();

  /**내 정보 가져오기*/
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: myAccountInfo } = personalInfo;

  /**유저 정보 가져오기*/
  const userMessageInfo = useSelector((state) => state.userMessageInfo);
  const { userMessageStatus } = userMessageInfo;

  // 유저가 접속하지 않고 상대가 이미 보낸 메세지 기록들, 동시 접속 시 상대가 보낸 메세지들
  const messageInfo = useSelector((state) => state.messageInfo);
  const { messageFetchStatus, messageSendStatus } = messageInfo;

  // 메세지 보낼 상대의 memberId를 params에 가져옴
  const location = useLocation().search;
  const opponentMemberId = +new URLSearchParams(location).get("user");
  const headers = { memberId: myAccountInfo?.memberId };

  // 웹 소켓 접속 여부의 체크해주는 state
  const [connected, setConnected] = useState(false);

  // 유저가 메세지 queue 주소와 접속했는지 확인하는 state
  const [subscribed, setSubscribed] = useState(false);

  const client = useRef();

  /** CONNECT: 웹 소켓 열어서 서버와 통신 시작 */
  function connectionInitiate() {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);
    client.current = Stomp.over(socket);
    client.current.connect({}, () => {
      setConnected(true);
      getDirectionOfMessages();
    });
  }

  /** 내가 보낸 혹은 받은 메세지를 state로 저장 */
  const getMessageFromServer = useCallback((response) => {
    dispatch(getMessagesAction(response));
  });

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
    setSubscribed(true);
    fetchMessages();
  }

  /** SEND/FETCH: 내가 접속하지 않을때 상대가 보낸 메세지들을 가져옴 */
  function fetchMessages() {
    client.current.send(
      "/app/fetch",
      {},
      JSON.stringify({
        memberId: myAccountInfo?.memberId,
        timeStamp: giveCurrentTime(),
      })
    );

    getAllMessageQueue();
  }

  /** SEND/GET: 이전의 기록들을 가져옴 */
  function getAllMessageQueue() {
    client.current.send(
      "/app/get",
      {},
      JSON.stringify({
        fromMemberId: myAccountInfo?.memberId,
        toMemberId: opponentMemberId,
        page: 0,
        timeStamp: giveCurrentTime(),
      })
    );
  }

  /** SEND: 메세지를 전송함 */
  async function sendMsg(messages) {
    if (!subscribed && connected) {
      await getDirectionOfMessages();
    }
    const request = {
      sendMemberId: myAccountInfo?.memberId,
      recvMemberId: opponentMemberId,
      timeStamp: giveCurrentTime(),
      message: messages,
    };

    await client.current.send("/app/send", {}, JSON.stringify(request));
    getMessageFromServer(JSON.stringify([request]));
  }

  // 웹 소켓 Disconnect
  function disconnect() {
    if (connected) {
      client.current.disconnect();
    }
  }

  useEffect(() => {
    if (!myAccountInfo) {
      dispatch(getPersonalInfoAction());
    } else {
      connectionInitiate();
    }

    return () => {
      if (client?.current) {
        disconnect();
      }
    };
  }, [myAccountInfo, connected]);

  // JSX를 추상화한 Props Object
  const conversationProps = {
    headerProps: {
      name: userMessageStatus?.name,
    },
    contentProps: {
      messageHistory: messageFetchStatus,
      messageReceivedNow: messageSendStatus,
      myMemberId: myAccountInfo?.memberId,
      opponent: userMessageStatus,

      giveCurrentTime: giveCurrentTime,
    },
    bottomProps: {
      sendMsg: sendMsg,
    },
  };

  return <ConversationScreenView {...conversationProps} />;
};

// VAC
const ConversationScreenView = ({ contentProps, bottomProps, headerProps }) => {
  return (
    <Conversation>
      <ConversationHeader {...headerProps} />
      <ConversationContent {...contentProps} />
      <ConversationBottom {...bottomProps} />
    </Conversation>
  );
};

const Conversation = styled.section`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  background-color: white;
  #partner {
    margin-right: 2rem;
  }
  #client-justify {
    justify-content: flex-end;
  }
  #client {
    margin-left: 2rem;
    border: none;
  }
`;

export default ConversationScreen;
