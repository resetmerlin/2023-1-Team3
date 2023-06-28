import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ConversatonHeaderView from "./header/ConversatonHeaderView";
import ConversationContent from "./content/ConversationContent";
import ConversationBottom from "./bottom/ConversationBottom";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import { getMessagesAction } from "../../actions/messageAction";
import { authToken } from "../../hooks/MemoizedRedux";

const ConversationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  // 내 정보 가져오기
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: myAccountInfo, loading } = personalInfo;

  const messageInfo = useSelector((state) => state.messageInfo);

  const {
    // 유저가 접속하지 않고 상대가 이미 보낸 메세지 기록들
    messageFetchStatus,
    // 동시 접속 시 상대가 보낸 메세지들
    messageSendStatus,
  } = messageInfo;

  const location = useLocation().search;

  // 메세지 보낼 상대의 memberId를 params에 가져옴
  const opponentMemberId = +new URLSearchParams(location).get("user");
  const headers = { memberId: myAccountInfo?.memberId };

  const client = useRef();

  // 웹 소켓 접속 여부의 체크해주는 state
  const [connected, setConnected] = useState(false);

  // 유저가 메세지 queue 주소와 접속했는지 확인하는 state
  const [subscribed, setSubscribed] = useState(false);

  // 웹 소켓 열어서 서버와 통신 시작
  const connectionInitiate = () => {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);

    client.current = Stomp.over(socket);

    client.current.connect({}, function () {
      setConnected(true);
      getDirectionOfMessage();
    });
  };

  const getMessageFromServer = useCallback((response) => {
    dispatch(getMessagesAction(response));
  });

  // 유저의 메시지 Queue Destintation에 접속
  const getDirectionOfMessage = useCallback(() => {
    if (connected) {
      client.current.subscribe(
        `/topic/${myAccountInfo?.memberId}`,
        function (response) {
          // 메세지 기록 redux에 저장하기 위해 dispatch
          getMessageFromServer(response);
        },
        headers
      );
      fetchMessages();

      setSubscribed(true);
    }
  }, [connected]);

  // 상대가 보낸 이전의 기록들을 get 해줌
  const fetchMessages = useCallback(() => {
    if (connected) {
      client.current.send(
        "/app/fetch",
        {},
        JSON.stringify({
          memberId: myAccountInfo?.memberId,
          timeStamp: new Date(2006, 0, 2, 15, 4, 5),
        })
      );
    }
  }, [connected]);

  // 상대 유저에게 메세지를 전송
  const sendMsg = async (messages) => {
    if (!subscribed && connected) {
      await getDirectionOfMessage();
    }
    const request = {
      sendMemberId: myAccountInfo?.memberId,
      recvMemberId: opponentMemberId,
      timeStamp: new Date(2006, 0, 2, 15, 4, 5),
      message: messages,
    };

    await client.current.send("/app/send", {}, JSON.stringify(request));
    await getMessageFromServer(JSON.stringify([request]));
    changeInputToNull();
  };

  // 웹 소켓 Disconnect
  const disconnect = () => {
    if (connected) {
      client.current.disconnect();
    }
  };

  // 메세지 보내기 위한 form control
  const onSubmit = useCallback(async (data) => {
    sendMsg(data?.message);
  }, []);

  // 내 정보 불러오기
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
  const props = {
    name: "장석구",
  };

  const contentProps = {
    messageHistory: messageFetchStatus,
    messageReceivedNow: messageSendStatus,
    myMemberId: myAccountInfo?.memberId,
  };

  const methods = useForm({
    mode: "onChange",
  });
  const { handleSubmit, register, setValue } = methods;

  const changeInputToNull = () => {
    setValue("message", "");
  };
  // JSX를 추상화한 Props Object
  const bottomProps = {
    onSubmit: onSubmit,
    handleSubmit: handleSubmit,
    register: { ...register("message", { required: true }) },
  };

  return (
    <Conversation>
      <ConversatonHeaderView {...props} />

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
`;

export default ConversationScreen;
