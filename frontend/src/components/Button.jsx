export const SubmitButton = ({ page }) => {
  return (
    <button className="form-default-height" type="submit">
      {page}
    </button>
  );
};

export const VerifyButton = ({ sendEmailData, getValues }) => {
  return (
    <button
      className="form-default-height email-verify-button"
      type="button"
      onClick={() => {
        sendEmailData(getValues);
      }}
    >
      코드 전송
    </button>
  );
};

export const VerifyCodeButton = ({
  sendCodeData,
  getValueEmail,

  getValueCode,
}) => {
  return (
    <button
      className="form-default-height email-verify-button"
      onClick={() => {
        sendCodeData(getValueEmail, getValueCode);
      }}
      type="button"
    >
      인증
    </button>
  );
};

export const BackButton = ({ returnToPage, pageName = "Setting" }) => {
  return (
    <button onClick={returnToPage}>
      <box-icon name="arrow-back" color="rgb(196, 196, 196)"></box-icon>
      <span>{pageName}</span>
    </button>
  );
};

export const SaveCheckButton = ({ sendImageToServer }) => {
  return (
    <button onClick={sendImageToServer}>
      <box-icon
        name="check"
        color="rgb(196, 196, 196)"
        size="2.3rem"
      ></box-icon>
    </button>
  );
};
