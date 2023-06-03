import React from "react";
import { selectInput } from "./InputsDefine";
import styled from "styled-components";

export const DefaultInput = ({
  input,
  register,
  errors,
  emailInfo,
  codeInfo,
  loginInfo,
}) => {
  const labelStyle = {
    color:
      errors?.[input.name] ||
      (emailInfo?.error && !emailInfo?.loading) ||
      (codeInfo?.error && !codeInfo?.loading) ||
      (loginInfo?.error && !loginInfo?.loading)
        ? "#D93025"
        : " rgb(128, 113, 252)",
  };
  const inputStyle = {
    animation:
      errors?.[input.name] &&
      `
      horizontal-shaking   .3s ease-in-out
      `,

    border:
      errors?.[input.name] ||
      (emailInfo?.error && !emailInfo?.loading) ||
      (codeInfo?.error && !codeInfo?.loading) ||
      (loginInfo?.error && !loginInfo?.loading)
        ? "1px solid #D93025"
        : "1px solid rgb(128, 113, 252)",
    borderRadius: errors?.[input.name] ? "5px" : "5px",
  };

  return (
    <FormInputWrap>
      <Label htmlFor={input?.name} style={labelStyle}>
        {input?.name == "secondPassword" ? "confirm password" : input?.name}
      </Label>
      <Input
        type={input?.type}
        id={input?.name}
        placeholder={input?.placeholder}
        {...register(input?.name)}
        style={inputStyle}
      />
    </FormInputWrap>
  );
};

export const GenderInput = ({ input, register, setValue, getValues }) => {
  const inputStyle = {
    color: input?.value == getValues ? "rgb(128, 113, 252)" : "#b1b1b1",

    border:
      input?.value == getValues
        ? " 1px solid  rgb(128, 113, 252)"
        : " 1px solid #b1b1b1",
  };
  return (
    <>
      <InputButton
        type={input?.type}
        id={input?.id}
        name={input?.name}
        style={inputStyle}
        value={input?.value}
        onClick={() => setValue(input?.name, input?.value)}
        {...register(input?.name)}
      >
        {input?.id == "male" ? "남자" : "여자"}
      </InputButton>
    </>
  );
};

export const DescriptionInput = ({ register, input }) => {
  const InputTextStyle = {
    height: "11rem",
    width: "86%",
    padding: ".5rem",
    border: "1px solid rgb(128, 113, 252)",
    borderRadius: "4px",
    resize: "none",

    marginBottom: "1.5rem",
  };
  return (
    <FormInputWrap
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1.6rem",
      }}
    >
      {" "}
      <TextareaStyle
        style={InputTextStyle}
        type={input?.type}
        id={input?.name}
        placeholder={input?.placeholder}
        {...register(input?.name)}
      ></TextareaStyle>
    </FormInputWrap>
  );
};
export const PersonalMajorInput = ({ register }) => {
  return (
    <FormInputWrap>
      <Label htmlFor="major">학과 선택</Label>
      <InputSelect {...register("major")} id="major" name="major">
        {selectInput.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          );
        })}
      </InputSelect>
    </FormInputWrap>
  );
};

export const AfterRegisterImageInput = ({ input, readFileImage }) => {
  return (
    <FormInputWrap style={{ justifyContent: "center", alignItems: "center" }}>
      <ImageLabel htmlFor="profile">
        <box-icon
          name="image-add"
          size="9rem"
          color="rgba(0,0,0,0.3)"
        ></box-icon>
        <span>사진 추가하기</span>
      </ImageLabel>
      <ImageInput
        type={input?.type}
        id={input?.name}
        accept={input?.accept}
        onChange={readFileImage}
        style={{ display: "none" }}
      />
    </FormInputWrap>
  );
};

export const FormInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Input = styled.input`
  margin: 0.5rem 0;
  font-size: 1rem;
  width: 100%;
  transition: all 0.1s ease;
  padding: 0 0.5rem;
  height: 3rem;
`;
const ImageInput = styled.input`
  margin: 0.5rem 0;
  font-size: 1rem;
  width: 100%;
  transition: all 0.1s ease;
  padding: 0 0.5rem;
  height: 3rem;
`;

const ImageLabel = styled.label`
  color: rgb(128, 113, 252);
  font-weight: 600;
  font-size: 0.9rem;
  height: 16rem;
  width: 76%;
  box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 600;
  }
`;
const InputSelect = styled.select`
  margin: 0.5rem 0;
  font-size: 1rem;
  width: 100%;
  transition: all 0.1s ease;
  padding: 0 0.5rem;
  height: 3rem;
  background-color: white;
  border: 1px solid rgb(128, 113, 252);
  border-radius: 5px;
`;
export const Label = styled.label`
  &::first-letter {
    text-transform: uppercase;
  }
  color: rgb(128, 113, 252);
  font-weight: 600;
  font-size: 0.9rem;
`;

const InputButton = styled.button`
  font-size: 1rem;
  height: 3.3rem;
  font-weight: 600;
  border-radius: 5px;
  width: 47.5%;
  transition: all 0.1s ease;
  background-color: white;
`;

const TextareaStyle = styled.textarea`
  font-size: 1rem;
  letter-spacing: -1px;

  width: 100%;
  transition: all 0.1s ease;
  height: 3rem;
`;
