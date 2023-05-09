import React from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, SaveCheckButton } from "./Button";

const SettingHeader = ({ sendImageToServer }) => {
  const navigate = useNavigate();
  const onBackPage = () => navigate("/setting");
  return (
    <div className="default-layout__top center">
      <BackButton returnToPage={onBackPage} />
      <SaveCheckButton saveClick={sendImageToServer} />
    </div>
  );
};
export default SettingHeader;
