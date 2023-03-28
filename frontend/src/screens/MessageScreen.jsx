import React from "react";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
const MessageScreen = () => {
  return (
    <>
      <section className="message">
        <span className="message__title">Your conversation</span>
        <Messages />
        <Footer />
      </section>
    </>
  );
};

export default MessageScreen;
