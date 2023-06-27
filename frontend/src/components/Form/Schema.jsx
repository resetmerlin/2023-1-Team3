import * as yup from "yup";

/** Schema for register form(회원가입 Form을 위한 스키마) */
export const registerSchema = yup
  .object({
    name: yup
      .string()
      .required("이름을 입력해 주세요")
      .min(2, "이름을 최소 두 글자로 작성하세요")
      .matches(/^[a-zA-Zㄱ-ㅎ가-힣]*$/, "숫자,특수문자는 불가능합니다. "),

    email: yup
      .string()
      .required("이메일을 입력하세요")
      .matches(
        /^[^\s@]+@dankook\.ac\.kr$/,
        "@dankook.ac.kr 형식에 맞게 작성하세요"
      ),

    password: yup
      .string()
      .required("필수 항목란 입니다.")
      .min(8, "비밀번호는 최소 8글자입니다")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "비밀번호에 특수문자와 숫자가 최소 1개 기입되어야 합니다"
      ),
    secondPassword: yup
      .string()
      .required("필수 항목란 입니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
    code: yup.string().required("이메일을 확인하세요"),
    birthday: yup
      .date("필수 항목란 입니다.")
      .required("필수 항목란 입니다.")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "19살 이상만 이용가능합니다."
      ),
    gender: yup.string().required("성별은 필수 입력란 입니다."),
    major: yup.string().required("학과는 필수 입력란 입니다."),
    description: yup.string(),
  })
  .required();

/** Schema for login form(로그인 Form을 위한 스키마) */
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("이메일을 입력하세요")
      .matches(
        /^[^\s@]+@dankook\.ac\.kr$/,
        "@dankook.ac.kr 형식에 맞게 작성하세요"
      ),

    password: yup
      .string()
      .required("비밀번호를 입력해 주세요")
      .min(8, "비밀번호는 최소 8글자입니다")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "비밀번호에 특수문자와 숫자가 최소 1개 기입되어야 합니다"
      ),
  })
  .required();

/** Schema for edit password form(비밀번호 재설정 Form을 위한 스키마) */
export const securityEditPassword = yup
  .object({
    currentPassword: yup
      .string()
      .required("비밀번호를 입력해 주세요")
      .min(8, "비밀번호는 최소 8글자입니다")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "비밀번호에 특수문자와 숫자가 최소 1개 기입되어야 합니다"
      ),

    password: yup
      .string()
      .required("비밀번호를 입력해 주세요")
      .min(8, "비밀번호는 최소 8글자입니다")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "비밀번호에 특수문자와 숫자가 최소 1개 기입되어야 합니다"
      ),
    secondPassword: yup
      .string()
      .required("필수 항목란 입니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  })
  .required();

/** Schema for personalInfo form(유저 정보 변경 Form을 위한 스키마) */
export const personalInfoSchema = yup
  .object({
    name: yup
      .string()
      .min(2, "이름을 최소 두 글자로 작성하세요")
      .matches(/^[a-zA-Zㄱ-ㅎ가-힣]*$/, "숫자,특수문자는 불가능합니다. "),

    birthday: yup
      .date("필수 항목란 입니다.")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "19살 이상만 이용가능합니다."
      ),
    major: yup.string(),
    gender: yup.string(),

    description: yup.string(),
  })
  .required();
