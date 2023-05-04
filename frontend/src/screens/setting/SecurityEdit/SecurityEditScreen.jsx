import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { securityEditInput } from "../../../components/Input/InputsDefine";
import { securityEditPassword } from "../../../components/Form/Schema";
import { useDispatch, useSelector } from "react-redux";
import { passwordEditAction } from "../../../actions/securityEditAction";

const SecurityEditScreen = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(securityEditPassword) });

  const passwordEditInfo = useSelector((state) => state.passwordEditInfo);
  const { error, loading, passwordEditStatus } = passwordEditInfo;

  const onSubmit = (passwordInfo) => {
    const { pastPassword, password, secondPassword } = passwordInfo;

    const passwordEditValue = {
      currentPassword: pastPassword,
      futurePassword: password,
    };
    dispatch(passwordEditAction(passwordEditValue));
  };

  const onError = console.log;

  return (
    <section className="securityEdit">
      <div className="securityEdit__top center">
        <Link to="/setting">
          <box-icon name="arrow-back" color="rgb(196, 196, 196)"></box-icon>
          <span>Setting</span>
        </Link>

        <Link to="/setting">
          <box-icon
            name="check"
            color="rgb(196, 196, 196)"
            size="2.3rem"
          ></box-icon>
        </Link>
      </div>
      <div className="securityEdit__content">
        <div className="form__container">
          <div className="form__wrap security-edit-form ">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              {/* 비밀번호 및 비밀번호 재 압력 칸 및 이름 */}
              {securityEditInput.map((input) => {
                return (
                  <div
                    className="form-input-wrap security-edit-input-wrap"
                    key={input.name}
                  >
                    <input
                      className="form-default-height"
                      type={input.type}
                      id={input.id}
                      name={input.name}
                      placeholder={input.placeholder}
                      {...register(input.name)}
                      style={{
                        border: errors?.[input.name]?.message
                          ? "1px solid red"
                          : "",
                        borderRadius: errors?.[input.name]?.message
                          ? "5px"
                          : "",
                      }}
                    />
                    {errors?.[input.name] && (
                      <p className="form__wrap__input-error">
                        {errors?.[input.name].message}
                      </p>
                    )}
                  </div>
                );
              })}

              {/** submit 버튼 핸들러*/}
              <button className="form-default-height" type="submit">
                회원가입
              </button>
              {error && <p className="form__wrap__input-error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityEditScreen;
