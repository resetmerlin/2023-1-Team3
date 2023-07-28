import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import {
  getMessagesHistoryAction,
  sendMessageAction,
} from "../../actions/messageAction";
import { styled } from "styled-components";
import ConversationContent from "./content/ConversationContent";
import ConversationBottom from "./bottom/ConversationBottom";
import ConversationHeader from "./header/ConversationHeader";
import { getImageSrc, giveCurrentTime } from "../../func/commonLogicHelper";
import { messageHistoryResetAction } from "../../actions/resetAction";
import { getSaveListAction } from "../../actions/saveAction";

const ConversationScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**내 정보 가져오기*/
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: myAccountInfo } = personalInfo;

  /**유저 정보 가져오기*/
  const userMessageInfo = useSelector((state) => state.userMessageInfo);
  const { userMessageStatus } = userMessageInfo;

  /**유저 정보 가져오기*/
  const messageSendInfo = useSelector((state) => state.messageSendInfo);
  const { messageSendStatus } = messageSendInfo;

  // 유저가 접속하지 않고 상대가 이미 보낸 메세지 기록들, 동시 접속 시 상대가 보낸 메세지들
  const messageInfo = useSelector((state) => state.messageInfo);
  const { messageFetchStatus } = messageInfo;

  // 메세지 보낼 상대의 memberId를 params에 가져옴
  const location = useLocation().search;
  const opponentMemberId = +new URLSearchParams(location).get("user");
  const headers = { memberId: myAccountInfo?.memberId };

  // 웹 소켓 접속 여부의 체크해주는 state
  const [connected, setConnected] = useState(false);

  /** 메세지 기록 page state */
  const [page, setPage] = useState(0);

  // 유저가 메세지 queue 주소와 접속했는지 확인하는 state
  const [subscribed, setSubscribed] = useState(false);

  const client = useRef();

  const pageRef = useRef();
  const pageChangeHandler = () => {
    setPage(page + 1);
  };

  /** CONNECT: 웹 소켓 열어서 서버와 통신 시작 */
  function connectionInitiate() {
    const memberId = myAccountInfo?.memberId;
    const headers = { memberId: memberId };

    if (!connected) {
      const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);
      client.current = Stomp.over(socket);
      client.current.connect({}, () => {
        setConnected(true);
        client.current.subscribe(
          `/topic/${memberId}`,
          function (response) {
            // 메세지 기록 redux에 저장하기 위해 dispatch
            if (response?.body) {
              const body = JSON.parse(response?.body);
              if (body?.status === "FETCH" || body?.status === "GET") {
                dispatch(getMessagesHistoryAction(response, pageRef.current));
              } else if (body?.status === "SEND" || body?.status === "OK") {
                dispatch(sendMessageAction(response));
              }
            }
          },
          headers
        );
        setSubscribed(true);
        fetchMessages(page);
      });
    }
  }

  /** SEND/FETCH: 내가 접속하지 않을때 상대가 보낸 메세지들을 가져옴 */
  function fetchMessages(page) {
    client.current.send(
      "/app/fetch",
      {},
      JSON.stringify({
        memberId: myAccountInfo?.memberId,
        timeStamp: giveCurrentTime(),
      })
    );

    getAllMessageQueue(page);
  }

  /** SEND/GET: 이전의 기록들을 가져옴 */
  async function getAllMessageQueue(scopePage) {
    setPage((prevPage) => {
      pageRef.current = prevPage + 1;
      return prevPage + 1;
    });
    client.current.send(
      "/app/get",
      {},
      JSON.stringify({
        fromMemberId: myAccountInfo?.memberId,
        toMemberId: opponentMemberId,
        page: scopePage,
        timeStamp: giveCurrentTime(),
      })
    );
  }

  /** SEND: 메세지를 전송함 */
  async function sendMsg(messages) {
    if (!subscribed || !connected) return;
    const request = {
      sendMemberId: myAccountInfo?.memberId,
      recvMemberId: opponentMemberId,
      timeStamp: giveCurrentTime(),
      message: messages,
    };

    await client.current.send("/app/send", {}, JSON.stringify(request));
    dispatch(sendMessageAction(JSON.stringify(request)));
  }

  // 웹 소켓 Disconnect
  function disconnect() {
    if (connected) {
      client.current.disconnect();
    }
  }
  useEffect(() => {
    dispatch(getSaveListAction(0));
  }, []);

  useEffect(() => {
    if (!myAccountInfo) {
      dispatch(getPersonalInfoAction());
    } else if (!connected) {
      dispatch(messageHistoryResetAction());
      connectionInitiate();
    } else if (!userMessageStatus) {
      navigate("/message");
    }

    return () => {
      if (client?.current) {
        disconnect();
        dispatch(messageHistoryResetAction());
      }
    };
  }, [myAccountInfo, connected]);

  // JSX를 추상화한 Props Object
  const conversationProps = {
    headerProps: {
      name: userMessageStatus?.name,
    },
    contentProps: {
      messageHistory: messageFetchStatus?.user?.messages,
      messageReceivedNow: messageSendStatus,
      myMemberId: myAccountInfo?.memberId,
      opponent: userMessageStatus,
      getAllMessageQueue: getAllMessageQueue,
      pageChangeHandler: pageChangeHandler,
      page: page,
      endPageSignal: messageFetchStatus?.endPageSignal,
      imageSrc: getImageSrc(userMessageStatus),

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
