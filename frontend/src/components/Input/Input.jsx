import React from "react";
import { selectInput } from "./InputsDefine";
export const DefaultInput = ({ input, register, errors }) => {
  const formStyle = {
    border: errors?.[input.name]?.message ? "1px solid red" : "",
    borderRadius: errors?.[input.name]?.message ? "5px" : "",
    width: "100%",
  };

  return (
    <div className="form-input-wrap">
      <input
        className="form-default-height"
        type={input.type}
        id={input.name}
        placeholder={input.placeholder}
        {...register(input.name)}
        style={formStyle}
      />
    </div>
  );
};

export const GenderInput = ({ input, register, setValue }) => {
  return (
    <div className={`form__checkbox-wrap--${input.id}`}>
      <input
        className="form__checkbox"
        type={input.type}
        id={input.id}
        name={input.name}
        value={input.value}
        onChange={() => setValue(input.name, input.value)}
        {...register(input.name)}
      />
      <label
        htmlFor={`${input.id}`}
        className={`form__checkbox--${input.id}-label`}
      >
        <i className={`bx bx-${input.id}`}></i>
      </label>
    </div>
  );
};

export const PersonalMajorInput = ({ register }) => {
  return (
    <select {...register("major")}>
      {selectInput.map((option) => {
        return <option value={option.value}>{option.value}</option>;
      })}
    </select>
  );
};
