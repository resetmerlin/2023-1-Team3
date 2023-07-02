import React, { forwardRef } from "react";

const ConversationBottomView = forwardRef(
  (
    { onSubmit, handleSubmit, register, reference, keyDownSubmit },
    { messageInputRef, messageFormRef }
  ) => {
    return (
      <div className="conversation__bottom">
        <form
          ref={messageFormRef}
          className="conversation__bottom__keyboard-input"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            type="text"
            onKeyDown={keyDownSubmit}
            className="blinking-cursor"
            {...register}
            ref={reference}
            autoFocus
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
  }
);

export default ConversationBottomView;
