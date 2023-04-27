import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import LoginForm from "../components/Form/LoginForm";
import RegisterForm from "../components/Form/RegisterForm";

export const LoginFormHook = ({ schema, onSubmit, loginInfo }) => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <LoginForm onSubmit={onSubmit} loginInfo={loginInfo} />
    </FormProvider>
  );
};

export const RegisterFormHook = ({
  schema,
  onSubmit,
  emailInfo,
  registerInfo,
  sendEmailData,
  sendCodeData,
  seconds,
  codeInfo,
}) => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <RegisterForm
        seconds={seconds}
        onSubmit={onSubmit}
        emailInfo={emailInfo}
        registerInfo={registerInfo}
        sendEmailData={sendEmailData}
        sendCodeData={sendCodeData}
        codeInfo={codeInfo}
      />
    </FormProvider>
  );
};
