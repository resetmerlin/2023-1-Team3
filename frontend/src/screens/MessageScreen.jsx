import React from "react";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
import { MessageHeader } from "../components/Header";
import { styled } from "styled-components";
import { BackButton } from "../components/Button";
const MessageScreen = () => {
  return (
    <>
      <section className="message">
        <MessageHeader></MessageHeader>
        <BackButton />

        <Row>
          <NewMessagesCount>9개의 새로운 메세지</NewMessagesCount>
          <Messages />
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
