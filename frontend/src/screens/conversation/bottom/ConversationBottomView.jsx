import React from "react";

const ConversationBottomView = ({ onSubmit, handleSubmit, register }) => {
  return (
    <div className="conversation__bottom">
      <form
        className="conversation__bottom__keyboard-input"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="blinking-cursor"
          autoFocus
          {...register}
        />

        <button className="conversation__bottom__message-send" type="submit">
          <box-icon
            name="paper-plane"
            color=" rgb(157, 140, 252)"
            type="solid"
          ></box-icon>
        </button>
      </form>
    </div>
  );
};

export default ConversationBottomView;
