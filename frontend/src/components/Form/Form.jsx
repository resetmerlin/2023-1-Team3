import React from "react";
import { Link } from "react-router-dom";
import { HandleInputChunk } from "../Input/InputChunk";
import { SubmitButton } from "../Button";
const Form = ({ inputs, register, errors, page }) => {
  return (
    <>
      {inputs?.map((input) => {
        return (
          <HandleInputChunk
            key={input.id}
            input={input}
            register={register}
            errors={errors}
            page={page}
          />
        );
      })}

      <SubmitButton page={"login"} />
      <Link to="/register" className="form__wrap__link">
        Not a member yet?
      </Link>
    </>
  );
};

export default Form;
