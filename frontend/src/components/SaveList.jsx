import React, { useState } from "react";
import { Link } from "react-router-dom";
const SaveList = () => {
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
        <div className="save__column">
          <div className="save__profile">
            <img
              src="./public/images/userImage/user-1.jpg"
              alt="save-profile"
            />
          </div>
          <div className="save__desc">
            <span className="save__desc__name">Jordyn Dokidos</span>
          </div>
          <div className="save__delete">
            <button>
              <box-icon
                type="solid"
                name="trash-alt"
                color=" rgb(141, 145, 157)"
                size="1.5rem"
              ></box-icon>
            </button>
          </div>
        </div>
        <div className="save__column">
          <div className="save__profile">
            <input
              type="checkbox"
              id="popup-profile"
              onChange={handlePopupChechekd}
            />
            <label htmlFor="popup-profile">
              <img
                src="./public/images/userImage/radom2.jpeg"
                alt="save-profile"
              />
            </label>
          </div>
          <div className="save__desc">
            <span className="save__desc__name">Michael roscsa</span>
          </div>
          <div className="save__delete">
            <button>
              <box-icon
                type="solid"
                name="trash-alt"
                color=" rgb(141, 145, 157)"
                size="1.5rem"
              ></box-icon>
            </button>
          </div>
        </div>
        <div className="save__column">
          <div className="save__profile">
            <img
              src="./public/images/userImage/random4.jpg"
              alt="save-profile"
            />
          </div>
          <div className="save__desc">
            <span className="save__desc__name">James linn</span>
          </div>
          <div className="save__delete">
            <button>
              <box-icon
                type="solid"
                name="trash-alt"
                color=" rgb(141, 145, 157)"
                size="1.5rem"
              ></box-icon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveList;
