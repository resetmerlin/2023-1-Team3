import React from "react";
import "./ConversationHeader.scss";
import { Link } from "react-router-dom";

const ConversationHeader = ({ name }) => {
  const props = {
    name: name,
  };
  return <ConversatonHeaderView {...props} />;
};

//VAC
const ConversatonHeaderView = ({ name }) => {
  return (
    <div className="conversation__header">
      <div className="conversation__header__back">
        <Link to="/message">
          <box-icon name="chevron-left" color="black" size="2.5rem"></box-icon>
        </Link>
      </div>
      <div className="conversation__header__information__wrap">
        <div className="conversation__header__information">
          <span className="conversation__header__information__name">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
