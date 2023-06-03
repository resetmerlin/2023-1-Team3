import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { styled } from "styled-components";
import { SettingHeader } from "../../components/Header";

const SettingScreen = () => {
  return (
    <Setting>
      <SettingHeader />
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
  font-size: 1.5rem;
  font-size: 1rem;

  align-self: start;
`;
export default SettingScreen;
