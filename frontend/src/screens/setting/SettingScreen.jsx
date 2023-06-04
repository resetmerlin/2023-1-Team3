import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { styled } from "styled-components";
import { SettingHeader } from "../../components/Header";

const SettingScreen = () => {
  return (
    <Setting>
      <SettingHeader />
      <SettingUserContent />

      <Footer />
    </Setting>
  );
};

const Setting = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  align-self: start;
`;

const SettingUserContent = styled.div`
  height: 20%;
  width: 100%;
  display: flex;

  align-self: center;
`;
export default SettingScreen;
