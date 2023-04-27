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
