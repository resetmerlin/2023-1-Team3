import React, { useEffect } from "react";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
import { MessageHeader } from "../components/Header";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../actions/securityEditAction";
const MessageScreen = () => {
  const navigate = useNavigate(0);
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: user, loading } = personalInfo;
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      dispatch(getPersonalInfoAction());
    } else {
    }
  }, []);

  const startMessageHandker = () => {
    if (user) {
      navigate(`/message/id?user=${DemoUser?.memberId}`);
    }
  };

  // Demo 상대 유저 정보
  const DemoUser = {
    memberId: 10,
    name: "김서현",
    gender: "FEMALE",
    birth: "2001-06-08",
    image: "DEFAULT",
    department: "응용컴퓨터공학과",
    introduction: "반갑습니다~ 김서현입니다!",
    startMessageHandker: startMessageHandker,
  };

  return (
    <>
      <section className="message">
        <MessageHeader navigate={navigate}></MessageHeader>

        <Row>
          <NewMessagesCount>9개의 새로운 메세지</NewMessagesCount>
          <Messages {...DemoUser} />
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
  margin: 0 1rem;
  color: #8071fc;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  height: 76vh;
  width: 100%;

  padding: 2rem 1.3rem 0 1.3rem;
`;

export default MessageScreen;
