import React from "react";

export const DefaultInputError = ({ input, errors }) => {
  return (
    <>
      {errors?.[input.name] && (
        <p className="form__wrap__input-error">
          {errors?.[input.name].message}
        </p>
      )}
    </>
  );
};

export const InputEmailError = ({ input, loginInfo, errors }) => {
  return (
    <>
      {errors?.[input.name] ? (
        <p className="form__wrap__input-error">{errors?.email?.message}</p>
      ) : (
        loginInfo.error &&
        !loginInfo.loading && (
          <p className="form__wrap__input-error">{loginInfo.error}</p>
        )
      )}
    </>
  );
};
export const InputEmailRegisterError = ({ input, errors, emailInfo }) => {
  return (
    <>
      {errors?.[input.name] ? (
        <p className="form__wrap__input-error">{errors?.email?.message}</p>
      ) : (
        emailInfo.error &&
        !emailInfo.loading && (
          <p className="form__wrap__input-error">{emailInfo.error}</p>
        )
      )}
    </>
  );
};
export const InputCodeError = ({
  emailStatus,
  codeLoading,
  codeError,
  seconds,
}) => {
  return (
    <>
      {emailStatus && !codeLoading && codeError ? (
        <p className="form__wrap__input-error">{codeError}</p>
      ) : emailStatus && seconds == 0 ? (
        <p className="form__wrap__input-error">
          입력기간이 만료되었습니다. 코드 전송 버튼을 다시 눌러주세요
        </p>
      ) : (
        <p className="form__wrap__input-error">{seconds}</p>
      )}
    </>
  );
};

export const InputGenderError = ({ input, errors }) => {
  return (
    <>
      {errors?.[input?.name] && (
        <p
          className="form__wrap__input-error"
          style={{
            textAlign: "center",
          }}
        >
          {errors?.[input?.name].message}
        </p>
      )}
    </>
  );
};

export const RegisterError = ({ registerError, registerLoading }) => {
  return (
    <>
      {registerError && !registerLoading && (
        <p
          className="form__wrap__input-error"
          style={{
            textAlign: "center",
            margin: ".4rem 0",
          }}
        >
          {registerError}
        </p>
      )}
    </>
  );
};
