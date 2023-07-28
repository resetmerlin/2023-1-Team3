import React, { memo } from "react";
import styled from "styled-components";

export const DefaultInputError = ({ input, errors }) => {
  return (
    <>
      {errors?.[input.name] && (
        <FormErrorMessage>{errors?.[input.name].message}</FormErrorMessage>
      )}
    </>
  );
};

export const InputEmailError = ({ input, loginInfo, errors }) => {
  return (
    <>
      {errors?.[input.name] ? (
        <FormErrorMessage>{errors?.[input.name]?.message}</FormErrorMessage>
      ) : (
        loginInfo.error &&
        !loginInfo.loading && (
          <FormErrorMessage>{loginInfo.error}</FormErrorMessage>
        )
      )}
    </>
  );
};
export const InputEmailRegisterError = ({ input, errors, emailInfo }) => {
  return (
    <>
      {errors?.[input.name] ? (
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      ) : !emailInfo?.loading &&
        emailInfo?.emailStatus == true &&
        !emailInfo?.error ? (
        <FormLoadingMessage>
          코드가 전송되었습니다! 이메일을 확인해 주세요.
        </FormLoadingMessage>
      ) : (
        emailInfo?.error &&
        !emailInfo?.loading && (
          <FormErrorMessage>{emailInfo?.error}</FormErrorMessage>
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
  codeBoolean,
}) => {
  return (
    <>
      {codeBoolean == true ? (
        <FormLoadingMessage>인증이 성공되었습니다!</FormLoadingMessage>
      ) : emailStatus && !codeLoading && codeError ? (
        <FormErrorMessage>{codeError}</FormErrorMessage>
      ) : emailStatus ? (
        <InputCodeCountdownError seconds={seconds} />
      ) : (
        ""
      )}
    </>
  );
};

export const InputCodeCountdownError = memo(({ seconds }) => {
  return (
    <>
      {seconds == 0 ? (
        <FormErrorMessage>
          입력기간이 만료되었습니다. 전송 버튼을 다시 눌러주세요
        </FormErrorMessage>
      ) : (
        <FormErrorMessage>{seconds}</FormErrorMessage>
      )}
    </>
  );
});

export const InputGenderError = ({ input, errors }) => {
  return (
    <>
      {errors?.[input?.name] && (
        <FormErrorMessage
          style={{
            marginTop: "1rem",

            textAlign: "center",
          }}
        >
          {errors?.[input?.name].message}
        </FormErrorMessage>
      )}
    </>
  );
};

export const RegisterError = ({ registerError, registerLoading }) => {
  return (
    <>
      {registerError && !registerLoading && (
        <FormErrorMessage
          style={{
            textAlign: "center",
            margin: ".4rem 0",
          }}
        >
          {registerError}
        </FormErrorMessage>
      )}
    </>
  );
};
const FormErrorMessage = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #d93025;
`;

export const FormLoadingMessage = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: rgb(128, 113, 252);
  font-weight: 600;
`;
