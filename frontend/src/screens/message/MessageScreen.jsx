import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import {
  getMessageRelationAction,
  messageInitiateAction,
} from "../../actions/messageAction";

import MessageScreenView from "./MessageScreenView";
import { giveCurrentTime } from "../../func/commonLogicHelper";
import { messageHistoryResetAction } from "../../actions/resetAction";
import { getSaveListAction } from "../../actions/saveAction";
const MessageScreen = () => {
  const navigate = useNavigate(0);

  const dispatch = useDispatch();

  // 내 정보 가져오기
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: myAccountInfo } = personalInfo;

  // 웹 소켓 접속 여부의 체크해주는 state
  const [connected, setConnected] = useState(false);

  /**메세지 주고 빋있단 유저 정보 가져오기*/
  const messageRelationInfo = useSelector((state) => state.messageRelationInfo);
  const { messageUserStatus, loading } = messageRelationInfo;

  const { id } = useParams();

  /** socket을 저장하기 위한 ref hook */
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
    const body = JSON.parse(response?.body);

    if (body?.status == "LOG") {
      dispatch(getMessageRelationAction(response));
    }
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

    getPersonMessageRelation();
  }
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

  // 웹 소켓 Disconnect
  function disconnect() {
    if (connected) {
      client.current.disconnect();
    }
  }

  useEffect(() => {
    dispatch(messageHistoryResetAction());
    dispatch(getSaveListAction(0));
  }, []);
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
  }, [myAccountInfo]);

  /** 대화할 유저 정보를 저장 및 톡방 생성 */
  const startMessage = async (user) => {
    await dispatch(messageInitiateAction(user));
    navigate(`/message/id?user=${user?.memberId}`);
  };

  const props = {
    navigate: navigate,
    n: !messageUserStatus?.length ? 0 : messageUserStatus.length,
    messageUserList: messageUserStatus,
    startMessage: startMessage,
  };

  return <MessageScreenView {...props} />;
};

export default MessageScreen;
