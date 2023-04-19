import React, { useState } from "react";
import { Link } from "react-router-dom";
import SaveUserColumn from "./SaveUserColumn";
const SaveList = ({ saveListStatus, pageState, pageFunc }) => {
  const [popupChecked, setPopupChecked] = useState(false);
  const handlePopupChechekd = (e) => {
    setPopupChecked(e.target.checked);
  };

  return (
    <>
      {popupChecked ? (
        <section className="popup">
          <button
            className="popup__back"
            onClick={() => setPopupChecked(false)}
          >
            <box-icon name="arrow-back" color="white"></box-icon>
          </button>
          <div className="popup__main">
            <div className="popup__main__information">
              <span className="popup__main__information__name">Chloe, 24</span>
              <div className="popup__main__information__desc">
                <div className="popup__main__information__desc__wrap">
                  <box-icon
                    type="solid"
                    name="graduation"
                    color="white"
                    style={{ marginRight: ".4rem" }}
                  ></box-icon>
                  DKU Computer-Science
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="save__row">
        {saveListStatus?.memberResponses.map((user) => {
          return <SaveUserColumn key={user.memberId} saveListStatus={user} />;
        })}

        {saveListStatus?.endPageSignal == false && (
          <button
            className="save__load"
            type="button"
            onClick={() => {
              pageState++;
              pageFunc(pageState);
            }}
          >
            <box-icon type="solid" name="chevron-down"></box-icon>
          </button>
        )}
      </div>
    </>
  );
};

export default SaveList;
